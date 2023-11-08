export interface IOptionGroup {
    value: string;
    label: string | React.ReactNode;
}

export interface IOptions {
    label: string | React.ReactNode;
    options: IOptionGroup[];
}