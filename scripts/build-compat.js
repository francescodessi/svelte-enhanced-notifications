import { build } from 'vite';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

// Compile the actual npm package with each supported compiler and runtime.
for (const major of [3, 4, 5]) {
	const name = major === 5 ? 'svelte' : `svelte${major}`;
	const compiler = await import(`${name}/compiler`);
	await build({
		configFile: false,
		resolve: {
			alias: [
				{ find: /^svelte(\/.*)?$/, replacement: `${name}$1` },
				{ find: '@dflare/svelte-enhanced-notifications', replacement: resolve('dist/index.js') }
			]
		},
		plugins: [
			{
				name: 'compatibility-compiler',
				transform(source, id) {
					if (id.endsWith('/tests/compat/legacy/main.js')) {
						return major === 5
							? {
									code: "import { mount } from 'svelte'; import App from '../Legacy.svelte'; mount(App, { target: document.getElementById('app') });"
								}
							: { code: source };
					}
					if (!id.endsWith('.svelte')) return;
					const result = compiler.compile(source, {
						filename: id,
						generate: major === 5 ? 'client' : 'dom',
						css: major === 3 ? true : 'injected'
					});
					return { code: result.js.code, map: result.js.map };
				}
			}
		],
		build: {
			outDir: `.compat/svelte${major}`,
			rollupOptions: {
				input:
					major === 5
						? ['tests/compat/legacy/index.html', 'tests/compat/modern/index.html']
						: ['tests/compat/legacy/index.html']
			}
		}
	});
}

// Type-check the distributed declarations against each major's own type exports.
const declarations = [
	'index.d.ts',
	'types.d.ts',
	'utilities.d.ts',
	'components/Notification.svelte.d.ts',
	'components/NotificationService.svelte.d.ts'
];
for (const major of [3, 4, 5]) {
	const dir = resolve(`.compat/types${major}`);
	await mkdir(`${dir}/components`, { recursive: true });
	for (const file of declarations) {
		const source = await readFile(`dist/${file}`, 'utf8');
		await writeFile(`${dir}/${file}`, source);
	}
	const packageName = major === 5 ? 'svelte' : `svelte${major}`;
	const packageInfo = JSON.parse(
		await readFile(`node_modules/${packageName}/package.json`, 'utf8')
	);
	const program = ts.createProgram(
		declarations.map((file) => resolve(dir, file)),
		{
			noEmit: true,
			paths: { svelte: [resolve('node_modules', packageName, packageInfo.types)] },
			strict: true,
			skipLibCheck: false,
			types: [],
			target: ts.ScriptTarget.ES2022,
			module: ts.ModuleKind.ESNext,
			moduleResolution: ts.ModuleResolutionKind.Bundler
		}
	);
	const errors = ts.getPreEmitDiagnostics(program);
	if (errors.length)
		throw new Error(
			ts.formatDiagnosticsWithColorAndContext(errors, {
				getCurrentDirectory: () => dir,
				getCanonicalFileName: (file) => file,
				getNewLine: () => '\n'
			})
		);
	console.log('Public declarations verified with Svelte ' + major);
}
