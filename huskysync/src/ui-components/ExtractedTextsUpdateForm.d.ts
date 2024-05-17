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
export declare type ExtractedTextsUpdateFormInputValues = {
    documentId?: string;
    documentname?: string;
    extractedText?: string;
    quizname?: string;
    s3_bucket?: string;
    s3_key?: string;
    username?: string;
};
export declare type ExtractedTextsUpdateFormValidationValues = {
    documentId?: ValidationFunction<string>;
    documentname?: ValidationFunction<string>;
    extractedText?: ValidationFunction<string>;
    quizname?: ValidationFunction<string>;
    s3_bucket?: ValidationFunction<string>;
    s3_key?: ValidationFunction<string>;
    username?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ExtractedTextsUpdateFormOverridesProps = {
    ExtractedTextsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    documentId?: PrimitiveOverrideProps<TextFieldProps>;
    documentname?: PrimitiveOverrideProps<TextFieldProps>;
    extractedText?: PrimitiveOverrideProps<TextFieldProps>;
    quizname?: PrimitiveOverrideProps<TextFieldProps>;
    s3_bucket?: PrimitiveOverrideProps<TextFieldProps>;
    s3_key?: PrimitiveOverrideProps<TextFieldProps>;
    username?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ExtractedTextsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ExtractedTextsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    extractedTexts?: any;
    onSubmit?: (fields: ExtractedTextsUpdateFormInputValues) => ExtractedTextsUpdateFormInputValues;
    onSuccess?: (fields: ExtractedTextsUpdateFormInputValues) => void;
    onError?: (fields: ExtractedTextsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ExtractedTextsUpdateFormInputValues) => ExtractedTextsUpdateFormInputValues;
    onValidate?: ExtractedTextsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ExtractedTextsUpdateForm(props: ExtractedTextsUpdateFormProps): React.ReactElement;
