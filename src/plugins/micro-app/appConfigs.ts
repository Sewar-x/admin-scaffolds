export const env = import.meta.env.MODE
import ProjectSetting from '@/settings/projectSetting'

const microAppUrl = {  
  oldApp: {  
      development: 'http://localhost:8080/#/',  
      test: 'https://test.example.com/oldApp/',  
      production: 'https://www.example.com/oldApp/'  
    },  
    newApp: {  
      development: 'http://localhost:8080/#/', 
      test: 'https://test.example.com/newApp/',  
      production: 'https://www.example.com/newApp/'  
    },  
  };  

export const subAppConfigs = {
  'oldApp': {
      name: 'oldApp',
      url: microAppUrl['oldApp'][env],
      'keep-alive': true
  },
  'newApp': {
      name: 'newApp',
      url: microAppUrl['newApp'][env],
      'keep-alive': true
  }
}

const microAppSetting = {
    projectName: ProjectSetting.projectName,
    isBaseApp: true, // 标记当前应用为主应用
    basePath: '/', // 打包路径或其他基础路径 
    disableSandbox: false, // 是否禁用沙箱
    iframe: true, // 是否使用 iframe
    lifeCycles: {
      created (e, appName) {
        console.log(`===子应用${appName}被创建===`)
      },
      beforemount (e, appName) {
        console.log(`===子应用${appName}即将渲染===`)
      },
      mounted (e, appName) {
        console.log(`===子应用${appName}已经渲染完成===`,e)
      },
      unmount (e, appName) {
        console.log(`===子应用${appName}已经卸载===`)
      },
      error (e, appName) {
        console.log(`===子应用${appName}加载出错===`)
      }
    },
    subAppConfigs  
}

export default microAppSetting
