/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ExtractedTextsCreateFormInputValues = {
    documentId?: string;
    documentname?: string;
    extractedText?: string;
    quizname?: string;
    s3_bucket?: string;
    s3_key?: string;
    username?: string;
};
export declare type ExtractedTextsCreateFormValidationValues = {
    documentId?: ValidationFunction<string>;
    documentname?: ValidationFunction<string>;
    extractedText?: ValidationFunction<string>;
    quizname?: ValidationFunction<string>;
    s3_bucket?: ValidationFunction<string>;
    s3_key?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExtractedTextsCreateFormOverridesProps = {
    ExtractedTextsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    documentId?: PrimitiveOverrideProps<TextFieldProps>;
    documentname?: PrimitiveOverrideProps<TextFieldProps>;
    extractedText?: PrimitiveOverrideProps<TextFieldProps>;
    quizname?: PrimitiveOverrideProps<TextFieldProps>;
    s3_bucket?: PrimitiveOverrideProps<TextFieldProps>;
    s3_key?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExtractedTextsCreateFormProps = React.PropsWithChildren<{
    overrides?: ExtractedTextsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ExtractedTextsCreateFormInputValues) => ExtractedTextsCreateFormInputValues;
    onSuccess?: (fields: ExtractedTextsCreateFormInputValues) => void;
    onError?: (fields: ExtractedTextsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExtractedTextsCreateFormInputValues) => ExtractedTextsCreateFormInputValues;
    onValidate?: ExtractedTextsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ExtractedTextsCreateForm(props: ExtractedTextsCreateFormProps): React.ReactElement;
