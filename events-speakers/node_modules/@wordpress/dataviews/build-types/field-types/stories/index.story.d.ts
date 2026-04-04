import DataForm from '../../dataform/index';
declare const meta: {
    title: string;
    component: typeof DataForm;
    argTypes: {
        type: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        Edit: {
            control: {
                type: string;
            };
            description: string;
            options: string[];
        };
        asyncElements: {
            control: {
                type: string;
            };
            description: string;
            options: boolean[];
        };
        manyElements: {
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
        type: string;
        Edit: string;
        asyncElements: boolean;
        manyElements: boolean;
    };
};
export default meta;
type PanelTypes = 'regular' | 'panel';
type ControlTypes = 'default' | 'adaptiveSelect' | 'array' | 'checkbox' | 'color' | 'combobox' | 'date' | 'datetime' | 'email' | 'integer' | 'number' | 'password' | 'radio' | 'select' | 'telephone' | 'url' | 'text' | 'toggle' | 'toggleGroup';
export declare const AllComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const TextComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const IntegerComponent: {
    ({ type, Edit, asyncElements, manyElements, formatSeparatorThousand, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
        formatSeparatorThousand?: string;
    }): import("react").JSX.Element;
    storyName: string;
    args: {
        formatSeparatorThousand: string;
    };
    argTypes: {
        formatSeparatorThousand: {
            control: string;
            description: string;
        };
    };
};
export declare const NumberComponent: {
    ({ type, Edit, asyncElements, manyElements, formatSeparatorThousand, formatSeparatorDecimal, formatDecimals, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
        formatSeparatorThousand?: string;
        formatSeparatorDecimal?: string;
        formatDecimals?: number;
    }): import("react").JSX.Element;
    storyName: string;
    args: {
        formatSeparatorThousand: string;
        formatSeparatorDecimal: string;
        formatDecimals: number;
    };
    argTypes: {
        formatSeparatorThousand: {
            control: string;
            description: string;
        };
        formatSeparatorDecimal: {
            control: string;
            description: string;
        };
        formatDecimals: {
            control: {
                type: string;
                min: number;
                max: number;
                step: number;
            };
            description: string;
        };
    };
};
export declare const BooleanComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const DateTimeComponent: {
    ({ type, Edit, asyncElements, manyElements, formatDatetime, formatWeekStartsOn, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
        formatDatetime?: string;
        formatWeekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }): import("react").JSX.Element;
    storyName: string;
    args: {
        formatDatetime: string;
        formatWeekStartsOn: undefined;
    };
    argTypes: {
        formatDatetime: {
            control: string;
            description: string;
        };
        formatWeekStartsOn: {
            control: string;
            options: {
                Default: undefined;
                Sunday: number;
                Monday: number;
                Tuesday: number;
                Wednesday: number;
                Thursday: number;
                Friday: number;
                Saturday: number;
            };
            description: string;
        };
    };
};
export declare const DateComponent: {
    ({ type, Edit, asyncElements, manyElements, formatDate, formatWeekStartsOn, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
        formatDate?: string;
        formatWeekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    }): import("react").JSX.Element;
    storyName: string;
    args: {
        formatDate: string;
        formatWeekStartsOn: undefined;
    };
    argTypes: {
        formatDate: {
            control: string;
            description: string;
        };
        formatWeekStartsOn: {
            control: string;
            options: {
                Default: undefined;
                Sunday: number;
                Monday: number;
                Tuesday: number;
                Wednesday: number;
                Thursday: number;
                Friday: number;
                Saturday: number;
            };
            description: string;
        };
    };
};
export declare const EmailComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const TelephoneComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const UrlComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const ColorComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const MediaComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const ArrayComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const PasswordComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
export declare const NoTypeComponent: {
    ({ type, Edit, asyncElements, manyElements, }: {
        type: PanelTypes;
        Edit: ControlTypes;
        asyncElements: boolean;
        manyElements: boolean;
    }): import("react").JSX.Element;
    storyName: string;
};
//# sourceMappingURL=index.story.d.ts.map