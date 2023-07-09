/* tslint:disable */
/* eslint-disable */
/**
 * λ by KevinZonda
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import type { Configuration } from './configuration';
import type { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios';
import globalAxios from 'axios';
// Some imports not used depending on template conditions
// @ts-ignore
import { DUMMY_BASE_URL, assertParamExists, setApiKeyToObject, setBasicAuthToObject, setBearerAuthToObject, setOAuthToObject, setSearchParams, serializeDataIfNeeded, toPathString, createRequestFunction } from './common';
import type { RequestArgs } from './base';
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, BaseAPI, RequiredError } from './base';

/**
 * 
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
    /**
     * 
     * @type {string}
     * @memberof ErrorResponse
     */
    'error'?: string;
}
/**
 * 
 * @export
 * @interface StatusItem
 */
export interface StatusItem {
    /**
     * 
     * @type {string}
     * @memberof StatusItem
     */
    'kind'?: string;
    /**
     * 
     * @type {string}
     * @memberof StatusItem
     */
    'status'?: string;
    /**
     * 
     * @type {string}
     * @memberof StatusItem
     */
    'last_trig_at'?: string;
    /**
     * 
     * @type {string}
     * @memberof StatusItem
     */
    'keep_until'?: string;
}

/**
 * StatusApi - axios parameter creator
 * @export
 */
export const StatusApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @summary Get All status
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllStatus: async (options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/status`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }

            const localVarRequestOptions = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            // authentication Token required
            await setApiKeyToObject(localVarHeaderParameter, "Authorisation", configuration)


    
            setSearchParams(localVarUrlObj, localVarQueryParameter);
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: toPathString(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * StatusApi - functional programming interface
 * @export
 */
export const StatusApiFp = function(configuration?: Configuration) {
    const localVarAxiosParamCreator = StatusApiAxiosParamCreator(configuration)
    return {
        /**
         * 
         * @summary Get All status
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async getAllStatus(options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => AxiosPromise<{ [key: string]: StatusItem; }>> {
            const localVarAxiosArgs = await localVarAxiosParamCreator.getAllStatus(options);
            return createRequestFunction(localVarAxiosArgs, globalAxios, BASE_PATH, configuration);
        },
    }
};

/**
 * StatusApi - factory interface
 * @export
 */
export const StatusApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = StatusApiFp(configuration)
    return {
        /**
         * 
         * @summary Get All status
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getAllStatus(options?: any): AxiosPromise<{ [key: string]: StatusItem; }> {
            return localVarFp.getAllStatus(options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * StatusApi - object-oriented interface
 * @export
 * @class StatusApi
 * @extends {BaseAPI}
 */
export class StatusApi extends BaseAPI {
    /**
     * 
     * @summary Get All status
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof StatusApi
     */
    public getAllStatus(options?: AxiosRequestConfig) {
        return StatusApiFp(this.configuration).getAllStatus(options).then((request) => request(this.axios, this.basePath));
    }
}


