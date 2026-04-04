/**
 * Internal dependencies
 */
import DataForm from '../index';
declare const meta: {
    title: string;
    component: typeof DataForm;
};
export default meta;
export declare const LayoutCard: {
    render: ({ withHeader, withSummary, isCollapsible, isOpened, }: {
        withHeader: boolean;
        withSummary: boolean;
        isCollapsible: boolean;
        isOpened?: boolean;
    }) => import("react").JSX.Element;
    argTypes: {
        withHeader: {
            control: {
                type: string;
            };
            description: string;
        };
        isCollapsible: {
            control: {
                type: string;
            };
            description: string;
        };
        isOpened: {
            control: {
                type: string;
            };
            description: string;
        };
        withSummary: {
            control: {
                type: string;
            };
            description: string;
        };
    };
    args: {
        withHeader: boolean;
        withSummary: boolean;
        isCollapsible: boolean;
    };
};
export declare const LayoutDetails: {
    render: () => import("react").JSX.Element;
};
export declare const LayoutPanel: {
    render: ({ labelPosition, openAs: openAsArg, editVisibility, applyLabel, cancelLabel, }: {
        type: "default" | "regular" | "panel" | "card";
        labelPosition: "default" | "top" | "side" | "none";
        openAs: "default" | "dropdown" | "modal";
        editVisibility: "default" | import("../..").EditVisibility;
        applyLabel?: string;
        cancelLabel?: string;
    }) => import("react").JSX.Element;
    argTypes: {
        labelPosition: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        openAs: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        editVisibility: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        applyLabel: {
            control: {
                type: string;
            };
            description: string;
            if: {
                arg: string;
                eq: string;
            };
        };
        cancelLabel: {
            control: {
                type: string;
            };
            description: string;
            if: {
                arg: string;
                eq: string;
            };
        };
    };
    args: {
        openAs: string;
    };
};
export declare const LayoutRegular: {
    render: ({ labelPosition, }: {
        labelPosition: "default" | "top" | "side" | "none";
    }) => import("react").JSX.Element;
    argTypes: {
        labelPosition: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
    };
};
export declare const LayoutRow: {
    render: ({ alignment, }: {
        alignment: "default" | "start" | "center" | "end";
    }) => import("react").JSX.Element;
    argTypes: {
        alignment: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
    };
    args: {
        alignment: string;
    };
};
export declare const LayoutMixed: {
    render: () => import("react").JSX.Element;
};
export declare const Validation: {
    render: ({ required, elements, custom, pattern, minMax, layout, }: {
        required: boolean;
        elements: "sync" | "async" | "none";
        custom: "sync" | "async" | "none";
        pattern: boolean;
        minMax: boolean;
        layout: "regular" | "panel-dropdown" | "panel-modal" | "card-collapsible" | "card-not-collapsible" | "details";
    }) => import("react").JSX.Element;
    argTypes: {
        layout: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        required: {
            control: {
                type: string;
            };
            description: string;
        };
        elements: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        custom: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        pattern: {
            control: {
                type: string;
            };
            description: string;
        };
        minMax: {
            control: {
                type: string;
            };
            description: string;
        };
    };
    args: {
        layout: string;
        required: boolean;
        elements: string;
        custom: string;
        pattern: boolean;
        minMax: boolean;
    };
};
export declare const Visibility: {
    render: () => import("react").JSX.Element;
};
export declare const DataAdapter: {
    render: () => import("react").JSX.Element;
};
//# sourceMappingURL=index.story.d.ts.map