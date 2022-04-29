import axios from 'axios';
import { factpost, factget, factdel, factpatch } from '@/utils/http';

// 登录接口
export function login(data) {
  return axios({ url: '/services/v1/user/login?_format=json', method: 'POST',  data: JSON.stringify(data) })
}
// 登出接口
export function logout() {
  return factpost("/services/v1/user/logout?_format=json", { data: "" })
}
// 自定义页面管理列表接口
export function queryList(data) {
  return factget('/services/v1/custom_page/index?_format=json&type=advanced_page', { data: JSON.stringify(data) })
}
// 自定义页面保存接口
export function submitForm(data) {
  return factpost('/services/v1/custom_page?_format=json&type=advanced_page', data)
}
// 自定义页面删除接口
export function delPage(param) {
  console.log('params', param);
  return factdel(`/services/v1/custom_page/${param.id}?_format=json&type=advanced_page`, param, { body: JSON.stringify(param) })
}
// 获取自定义页面详情数据接口
export function urlLoadPage(data) {
  return factget(`/services/v1/custom_page/${data.id}?_format=json&type=advanced_page`, { data: data.id }, { data: JSON.stringify(data) })
}
// 编辑自定义页面数据接口
export function urlStorePage(data) {
  return factpatch(`/services/v1/custom_page/${data.id}?_format=json`, data, { data: JSON.stringify(data) })
}



export default {
  login, logout, queryList, submitForm, delPage, urlLoadPage, urlStorePage
}


