// GlobalState.ts
class GlobalState {
  private static instance: GlobalState | null = null
  private readonly state = {
    router: null, // 路由实例
    store: null, // store 实例
    microApp: null // microApp 实例
  } // 或者使用具体的类型，如interface

  // 私有构造函数，确保外部不能直接通过new创建实例
  private constructor() {}

  // 获取单例实例
  public static getInstance(): GlobalState {
    if (!GlobalState.instance) {
      GlobalState.instance = new GlobalState()
    }
    return GlobalState.instance
  }

  // 设置全局状态, 设置单个全局状态
  public setState(key: string, value: any): void {
    this.state[key] = value
  }

  // 一次性设置全局状态
  public setAllState(initValue: object): void {
    for (const key in initValue) {
      // @ts-ignore
      // 使用 TypeScript 的类型守卫确保 key 在 this.state 中存在
      if (key in this.state) {
        // @ts-ignore
        this.state[key] = initValue[key]
      }
    }
  }

  // 获取全局状态
  public getState(key: string): any {
    return this.state[key]
  }
}

// 导出单例的getter方法，以便在其他模块中使用
export default GlobalState.getInstance()

/** 
// 使用示例  
// 在其他模块中  
import globalState from './GlobalState';  

// 设置全局状态  
globalState.setState('username', 'JohnDoe');  

// 获取全局状态  
console.log(globalState.getState('username')); // 输出: JohnDoe  

*/
