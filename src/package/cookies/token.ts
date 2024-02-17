import { getConfig, setConfig } from './cookie'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const setUserToken = async (userToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  config.userToken = userToken
  setConfig(config, cookies)
}

export const getUserToken = (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  return config.userToken
}

export const setAdminToken = async (adminToken: string, cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  config.adminToken = adminToken
  setConfig(config, cookies)
}

export const getAdminToken = async (cookies: ReadonlyRequestCookies) => {
  const config = getConfig(cookies)
  return config.adminToken
}