/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createUsers } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function UsersCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    bio: "",
    email: "",
    firstname: "",
    lastname: "",
    groups: [],
    pastquizzes: [],
    rsvpquizzes: [],
    username: "",
  };
  const [bio, setBio] = React.useState(initialValues.bio);
  const [email, setEmail] = React.useState(initialValues.email);
  const [firstname, setFirstname] = React.useState(initialValues.firstname);
  const [lastname, setLastname] = React.useState(initialValues.lastname);
  const [groups, setGroups] = React.useState(initialValues.groups);
  const [pastquizzes, setPastquizzes] = React.useState(
    initialValues.pastquizzes
  );
  const [rsvpquizzes, setRsvpquizzes] = React.useState(
    initialValues.rsvpquizzes
  );
  const [username, setUsername] = React.useState(initialValues.username);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setBio(initialValues.bio);
    setEmail(initialValues.email);
    setFirstname(initialValues.firstname);
    setLastname(initialValues.lastname);
    setGroups(initialValues.groups);
    setCurrentGroupsValue("");
    setPastquizzes(initialValues.pastquizzes);
    setCurrentPastquizzesValue("");
    setRsvpquizzes(initialValues.rsvpquizzes);
    setCurrentRsvpquizzesValue("");
    setUsername(initialValues.username);
    setErrors({});
  };
  const [currentGroupsValue, setCurrentGroupsValue] = React.useState("");
  const groupsRef = React.createRef();
  const [currentPastquizzesValue, setCurrentPastquizzesValue] =
    React.useState("");
  const pastquizzesRef = React.createRef();
  const [currentRsvpquizzesValue, setCurrentRsvpquizzesValue] =
    React.useState("");
  const rsvpquizzesRef = React.createRef();
  const validations = {
    bio: [],
    email: [{ type: "Required" }],
    firstname: [],
    lastname: [],
    groups: [],
    pastquizzes: [],
    rsvpquizzes: [],
    username: [],
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
          bio,
          email,
          firstname,
          lastname,
          groups,
          pastquizzes,
          rsvpquizzes,
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
            query: createUsers.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "UsersCreateForm")}
      {...rest}
    >
      <TextField
        label="Bio"
        isRequired={false}
        isReadOnly={false}
        value={bio}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bio: value,
              email,
              firstname,
              lastname,
              groups,
              pastquizzes,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            value = result?.bio ?? value;
          }
          if (errors.bio?.hasError) {
            runValidationTasks("bio", value);
          }
          setBio(value);
        }}
        onBlur={() => runValidationTasks("bio", bio)}
        errorMessage={errors.bio?.errorMessage}
        hasError={errors.bio?.hasError}
        {...getOverrideProps(overrides, "bio")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bio,
              email: value,
              firstname,
              lastname,
              groups,
              pastquizzes,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Firstname"
        isRequired={false}
        isReadOnly={false}
        value={firstname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname: value,
              lastname,
              groups,
              pastquizzes,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            value = result?.firstname ?? value;
          }
          if (errors.firstname?.hasError) {
            runValidationTasks("firstname", value);
          }
          setFirstname(value);
        }}
        onBlur={() => runValidationTasks("firstname", firstname)}
        errorMessage={errors.firstname?.errorMessage}
        hasError={errors.firstname?.hasError}
        {...getOverrideProps(overrides, "firstname")}
      ></TextField>
      <TextField
        label="Lastname"
        isRequired={false}
        isReadOnly={false}
        value={lastname}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname,
              lastname: value,
              groups,
              pastquizzes,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            value = result?.lastname ?? value;
          }
          if (errors.lastname?.hasError) {
            runValidationTasks("lastname", value);
          }
          setLastname(value);
        }}
        onBlur={() => runValidationTasks("lastname", lastname)}
        errorMessage={errors.lastname?.errorMessage}
        hasError={errors.lastname?.hasError}
        {...getOverrideProps(overrides, "lastname")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname,
              lastname,
              groups: values,
              pastquizzes,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            values = result?.groups ?? values;
          }
          setGroups(values);
          setCurrentGroupsValue("");
        }}
        currentFieldValue={currentGroupsValue}
        label={"Groups"}
        items={groups}
        hasError={errors?.groups?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("groups", currentGroupsValue)
        }
        errorMessage={errors?.groups?.errorMessage}
        setFieldValue={setCurrentGroupsValue}
        inputFieldRef={groupsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Groups"
          isRequired={false}
          isReadOnly={false}
          value={currentGroupsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.groups?.hasError) {
              runValidationTasks("groups", value);
            }
            setCurrentGroupsValue(value);
          }}
          onBlur={() => runValidationTasks("groups", currentGroupsValue)}
          errorMessage={errors.groups?.errorMessage}
          hasError={errors.groups?.hasError}
          ref={groupsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "groups")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname,
              lastname,
              groups,
              pastquizzes: values,
              rsvpquizzes,
              username,
            };
            const result = onChange(modelFields);
            values = result?.pastquizzes ?? values;
          }
          setPastquizzes(values);
          setCurrentPastquizzesValue("");
        }}
        currentFieldValue={currentPastquizzesValue}
        label={"Pastquizzes"}
        items={pastquizzes}
        hasError={errors?.pastquizzes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("pastquizzes", currentPastquizzesValue)
        }
        errorMessage={errors?.pastquizzes?.errorMessage}
        setFieldValue={setCurrentPastquizzesValue}
        inputFieldRef={pastquizzesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Pastquizzes"
          isRequired={false}
          isReadOnly={false}
          value={currentPastquizzesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.pastquizzes?.hasError) {
              runValidationTasks("pastquizzes", value);
            }
            setCurrentPastquizzesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("pastquizzes", currentPastquizzesValue)
          }
          errorMessage={errors.pastquizzes?.errorMessage}
          hasError={errors.pastquizzes?.hasError}
          ref={pastquizzesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "pastquizzes")}
        ></TextField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname,
              lastname,
              groups,
              pastquizzes,
              rsvpquizzes: values,
              username,
            };
            const result = onChange(modelFields);
            values = result?.rsvpquizzes ?? values;
          }
          setRsvpquizzes(values);
          setCurrentRsvpquizzesValue("");
        }}
        currentFieldValue={currentRsvpquizzesValue}
        label={"Rsvpquizzes"}
        items={rsvpquizzes}
        hasError={errors?.rsvpquizzes?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("rsvpquizzes", currentRsvpquizzesValue)
        }
        errorMessage={errors?.rsvpquizzes?.errorMessage}
        setFieldValue={setCurrentRsvpquizzesValue}
        inputFieldRef={rsvpquizzesRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Rsvpquizzes"
          isRequired={false}
          isReadOnly={false}
          value={currentRsvpquizzesValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.rsvpquizzes?.hasError) {
              runValidationTasks("rsvpquizzes", value);
            }
            setCurrentRsvpquizzesValue(value);
          }}
          onBlur={() =>
            runValidationTasks("rsvpquizzes", currentRsvpquizzesValue)
          }
          errorMessage={errors.rsvpquizzes?.errorMessage}
          hasError={errors.rsvpquizzes?.hasError}
          ref={rsvpquizzesRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "rsvpquizzes")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Username"
        isRequired={false}
        isReadOnly={false}
        value={username}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              bio,
              email,
              firstname,
              lastname,
              groups,
              pastquizzes,
              rsvpquizzes,
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
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
