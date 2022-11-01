import yaml from 'yaml'

/** Parses given swagger file. And returns the parsed object. */
export const parseSwaggerFile = (swaggerFile: string) => {
    return yaml.parse(swaggerFile)
}