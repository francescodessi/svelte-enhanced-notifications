
export const DEFAULT_VARIANTS = {
    error: {
        primaryColor: "#db3057",
        primaryColorVariant: "#50001c",
        fontColor: "#ffffff",
        icon: "material-symbols:error-rounded"
    },
    warning: {
        primaryColor: "#fc8622",
        primaryColorVariant: "#832f0b",
        fontColor: "#ffffff",
        icon: "material-symbols:warning-rounded"
    },
    success: {
        primaryColor: "#03a66a",
        primaryColorVariant: "#014027",
        fontColor: "#ffffff",
        icon: "material-symbols:check-circle-rounded"
    },
    info: {
        primaryColor: "#0070e1",
        primaryColorVariant: "#042b52",
        fontColor: "#ffffff",
        icon: "material-symbols:info-rounded"
    },
    help: {
        primaryColor: "#ba68c8",
        primaryColorVariant: "#410a58",
        fontColor: "#ffffff",
        icon: "material-symbols:help-rounded"
    },
    default: {
        primaryColor: "#648095",
        primaryColorVariant: "#384b58",
        fontColor: "#ffffff",
        icon: undefined
    }
};

export const DEFAULT_LOCATIONS = {
    topLeft: {
        position: "fixed",
        top: "0",
        left: "0",
        right: "auto",
        bottom: "auto",
        zIndex: "1",
        transform: "none"
    },
    top: {
        position: "fixed",
        top: "0",
        left: "50%",
        right: "auto",
        bottom: "auto",
        zIndex: "1",
        transform: "translate(-50%, 0)"
    },
    topRight: {
        position: "fixed",
        top: "0",
        left: "auto",
        right: "0",
        bottom: "auto",
        zIndex: "1",
        transform: "none"
    },
    left: {
        position: "fixed",
        top: "50%",
        left: "0",
        right: "auto",
        bottom: "auto",
        zIndex: "1",
        transform: "translate(0, -50%)",
    },
    center: {
        position: "fixed",
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        zIndex: "1",
        transform: "translate(-50%, -50%)"
    },
    right: {
        position: "fixed",
        top: "50%",
        left: "auto",
        right: "0",
        bottom: "auto",
        zIndex: "1",
        transform: "translate(0, -50%)",
    },
    bottomLeft: {
        position: "fixed",
        top: "auto",
        left: "0",
        right: "auto",
        bottom: "0",
        zIndex: "1",
        transform: "none"
    },
    bottom: {
        position: "fixed",
        top: "auto",
        left: "50%",
        right: "auto",
        bottom: "0",
        zIndex: "1",
        transform: "translate(-50%, 0)"
    },
    bottomRight: {
        position: "fixed",
        top: "auto",
        left: "auto",
        right: "0",
        bottom: "0",
        zIndex: "1",
        transform: "none"
    }
}