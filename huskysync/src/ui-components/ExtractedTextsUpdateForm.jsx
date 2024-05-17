/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getExtractedTexts } from "../graphql/queries";
import { updateExtractedTexts } from "../graphql/mutations";
const client = generateClient();
export default function ExtractedTextsUpdateForm(props) {
  const {
    id: idProp,
    extractedTexts: extractedTextsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    documentId: "",
    documentname: "",
    extractedText: "",
    quizname: "",
    s3_bucket: "",
    s3_key: "",
    username: "",
  };
  const [documentId, setDocumentId] = React.useState(initialValues.documentId);
  const [documentname, setDocumentname] = React.useState(
    initialValues.documentname
  );
  const [extractedText, setExtractedText] = React.useState(
    initialValues.extractedText
  );
  const [quizname, setQuizname] = React.useState(initialValues.quizname);
  const [s3_bucket, setS3_bucket] = React.useState(initialValues.s3_bucket);
  const [s3_key, setS3_key] = React.useState(initialValues.s3_key);
  const [username, setUsername] = React.useState(initialValues.username);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = extractedTextsRecord
      ? { ...initialValues, ...extractedTextsRecord }
      : initialValues;
    setDocumentId(cleanValues.documentId);
    setDocumentname(cleanValues.documentname);
    setExtractedText(cleanValues.extractedText);
    setQuizname(cleanValues.quizname);
    setS3_bucket(cleanValues.s3_bucket);
    setS3_key(cleanValues.s3_key);
    setUsername(cleanValues.username);
    setErrors({});
  };
  const [extractedTextsRecord, setExtractedTextsRecord] = React.useState(
    extractedTextsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getExtractedTexts.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getExtractedTexts
        : extractedTextsModelProp;
      setExtractedTextsRecord(record);
    };
    queryData();
  }, [idProp, extractedTextsModelProp]);
  React.useEffect(resetStateValues, [extractedTextsRecord]);
  const validations = {
    documentId: [{ type: "Required" }],
    documentname: [{ type: "Required" }],
    extractedText: [{ type: "Required" }],
    quizname: [{ type: "Required" }],
    s3_bucket: [{ type: "Required" }],
    s3_key: [{ type: "Required" }],
    username: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          documentId,
          documentname,
          extractedText,
          quizname,
          s3_bucket,
          s3_key,
          username,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateExtractedTexts.replaceAll("__typename", ""),
            variables: {
              input: {
                id: extractedTextsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ExtractedTextsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Document id"
        isRequired={true}
        isReadOnly={false}
        value={documentId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId: value,
              documentname,
              extractedText,
              quizname,
              s3_bucket,
              s3_key,
              username,
            };
            const result = onChange(modelFields);
            value = result?.documentId ?? value;
          }
          if (errors.documentId?.hasError) {
            runValidationTasks("documentId", value);
          }
          setDocumentId(value);
        }}
        onBlur={() => runValidationTasks("documentId", documentId)}
        errorMessage={errors.documentId?.errorMessage}
        hasError={errors.documentId?.hasError}
        {...getOverrideProps(overrides, "documentId")}
      ></TextField>
      <TextField
        label="Documentname"
        isRequired={true}
        isReadOnly={false}
        value={documentname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname: value,
              extractedText,
              quizname,
              s3_bucket,
              s3_key,
              username,
            };
            const result = onChange(modelFields);
            value = result?.documentname ?? value;
          }
          if (errors.documentname?.hasError) {
            runValidationTasks("documentname", value);
          }
          setDocumentname(value);
        }}
        onBlur={() => runValidationTasks("documentname", documentname)}
        errorMessage={errors.documentname?.errorMessage}
        hasError={errors.documentname?.hasError}
        {...getOverrideProps(overrides, "documentname")}
      ></TextField>
      <TextField
        label="Extracted text"
        isRequired={true}
        isReadOnly={false}
        value={extractedText}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname,
              extractedText: value,
              quizname,
              s3_bucket,
              s3_key,
              username,
            };
            const result = onChange(modelFields);
            value = result?.extractedText ?? value;
          }
          if (errors.extractedText?.hasError) {
            runValidationTasks("extractedText", value);
          }
          setExtractedText(value);
        }}
        onBlur={() => runValidationTasks("extractedText", extractedText)}
        errorMessage={errors.extractedText?.errorMessage}
        hasError={errors.extractedText?.hasError}
        {...getOverrideProps(overrides, "extractedText")}
      ></TextField>
      <TextField
        label="Quizname"
        isRequired={true}
        isReadOnly={false}
        value={quizname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname,
              extractedText,
              quizname: value,
              s3_bucket,
              s3_key,
              username,
            };
            const result = onChange(modelFields);
            value = result?.quizname ?? value;
          }
          if (errors.quizname?.hasError) {
            runValidationTasks("quizname", value);
          }
          setQuizname(value);
        }}
        onBlur={() => runValidationTasks("quizname", quizname)}
        errorMessage={errors.quizname?.errorMessage}
        hasError={errors.quizname?.hasError}
        {...getOverrideProps(overrides, "quizname")}
      ></TextField>
      <TextField
        label="S3 bucket"
        isRequired={true}
        isReadOnly={false}
        value={s3_bucket}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname,
              extractedText,
              quizname,
              s3_bucket: value,
              s3_key,
              username,
            };
            const result = onChange(modelFields);
            value = result?.s3_bucket ?? value;
          }
          if (errors.s3_bucket?.hasError) {
            runValidationTasks("s3_bucket", value);
          }
          setS3_bucket(value);
        }}
        onBlur={() => runValidationTasks("s3_bucket", s3_bucket)}
        errorMessage={errors.s3_bucket?.errorMessage}
        hasError={errors.s3_bucket?.hasError}
        {...getOverrideProps(overrides, "s3_bucket")}
      ></TextField>
      <TextField
        label="S3 key"
        isRequired={true}
        isReadOnly={false}
        value={s3_key}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname,
              extractedText,
              quizname,
              s3_bucket,
              s3_key: value,
              username,
            };
            const result = onChange(modelFields);
            value = result?.s3_key ?? value;
          }
          if (errors.s3_key?.hasError) {
            runValidationTasks("s3_key", value);
          }
          setS3_key(value);
        }}
        onBlur={() => runValidationTasks("s3_key", s3_key)}
        errorMessage={errors.s3_key?.errorMessage}
        hasError={errors.s3_key?.hasError}
        {...getOverrideProps(overrides, "s3_key")}
      ></TextField>
      <TextField
        label="Username"
        isRequired={true}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              documentId,
              documentname,
              extractedText,
              quizname,
              s3_bucket,
              s3_key,
              username: value,
            };
            const result = onChange(modelFields);
            value = result?.username ?? value;
          }
          if (errors.username?.hasError) {
            runValidationTasks("username", value);
          }
          setUsername(value);
        }}
        onBlur={() => runValidationTasks("username", username)}
        errorMessage={errors.username?.errorMessage}
        hasError={errors.username?.hasError}
        {...getOverrideProps(overrides, "username")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || extractedTextsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || extractedTextsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
