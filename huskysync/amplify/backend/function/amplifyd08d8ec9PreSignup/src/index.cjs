/* Amplify Params - DO NOT EDIT
    API_AMPLIFYAPI_GRAPHQLAPIENDPOINTOUTPUT
    API_AMPLIFYAPI_GRAPHQLAPIIDOUTPUT
    API_AMPLIFYAPI_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */

/**
 * @fileoverview
 * This CloudFormation Trigger creates a handler which awaits the other handlers
 * specified in the `MODULES` env var, located at `./${MODULE}`.
 */

/**
 * The names of modules to load are stored as a comma-delimited string in the
 * `MODULES` env var.
 */
const moduleNames = process.env.MODULES.split(',');

/**
 * This async handler iterates over the given modules and awaits them.
 * @see https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html#nodejs-handler-async
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
    /**
     * Load modules dynamically based on the MODULES environment variable.
     * Uses dynamic import, which returns a promise.
     */
    const modules = await Promise.all(
        moduleNames.map(name => import(`./${name}.js`))
    );

    /**
     * Instead of naively iterating over all handlers, run them concurrently with
     * `await Promise.all(...)`. This would otherwise just be determined by the
     * order of names in the `MODULES` var.
     */
    await Promise.all(modules.map(module => module.handler(event, context)));

    return event;
};
