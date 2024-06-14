import { isObject } from "./is";

// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

/**
 * 深拷贝
 * @param target 
 * @returns 
 */
export function deepClone(obj: any) {
    //基本类型和null是不可变的，无需进行深拷贝
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    
    let copy;
    
    if (Array.isArray(obj)) {
      copy = [];
      for (let i = 0; i < obj.length; i++) {
        copy[i] = deepClone(obj[i]);//递归调用deepCopy函数来对对象的每个属性进行深拷贝
      }
    } else {
      copy = {};
      for (let key in obj) {
        //在遍历对象属性时，通过hasOwnProperty方法来确保只复制对象自身的属性，而不包括继承的属性。
        if (obj.hasOwnProperty(key)) {
          copy[key] = deepClone(obj[key]);//递归调用deepCopy函数来对对象的每个属性进行深拷贝
        }
      }
    }
    
    return copy;
}

/**
 * 将字符串首字母变为大写
 */
export function toUpper(val: string) {
  if (typeof val === "undefined") return;
  const str = val;
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}



/**
 * 判断变量是否为函数
 *  - Inspired:
 *    https://github.com/jashkenas/underscore/blob/master/modules/isFunction.js
 */
export function isFunction(functionToCheck: Function) {
  const getType = {}
  return (
    functionToCheck &&
    getType.toString.call(functionToCheck) === '[object Function]'
  )
}

interface IframeType {
  dom: Element,
  src: string,
  onload: Function,
  onerror: Function,
  hidden: Boolean
}

/**
 * 动态创建iframe
 * @param dom 创建iframe的容器，即在dom中创建iframe。dom可以是div、span或者其他标签。
 * @param src iframe中打开的网页路径
 * @param onload iframe加载完后触发该事件，可以为空
 * @param hidden 是否显示iframe
 * @return 返回创建的iframe对象
 */
export function createIframe({
  dom,
  src,
  onload,
  onerror,
  hidden = false }: IframeType): Element {
  // 在document中创建iframe
  const iframe: any = document.createElement('iframe')

  // 设置iframe的样式
  iframe.style.width = hidden ? '0' : '100%'
  iframe.style.height = hidden ? '0' : '100%'
  iframe.style.margin = '0'
  iframe.style.padding = '0'
  iframe.style.overflow = 'hidden'
  iframe.style.border = 'none'

  // 绑定iframe的onload事件
  if (isFunction(onload) || isFunction(onerror)) {
    if (iframe.attachEvent) {
      onload && iframe.attachEvent('onload', onload)
      onerror && iframe.attachEvent('onerror', onerror)
    } else if (iframe.addEventListener) {
      onload && iframe.addEventListener('load', onload)
      onerror && iframe.addEventListener('error', onerror)
    } else {
      onload && (iframe.onload = onload)
      onerror && (iframe.onerror = onerror)
    }
  }

  iframe.src = src
  // 把iframe加载到dom下面
  dom.appendChild(iframe)
  return iframe
}

/**
 * 销毁iframe，释放iframe所占用的内存。
 * @param iframe 需要销毁的iframe对象
 */
export function destroyIframe(iframe: any) {
  if (!iframe) return
  // 把iframe指向空白页面，这样可以释放大部分内存。
  iframe.src = 'about:blank'
  try {
    iframe.contentWindow.document.write('')
    iframe.contentWindow.document.clear()
  } catch (e) {
    console.error(e)
  }
  // 把iframe从页面移除
  iframe.parentNode.removeChild(iframe)
}

/**
 * 动态创建a标签实现文件附件的下载
 * @param {*} url
 * @param {*} filename
 * @returns
 */
export function downloadFileByLink(url: string, filename: string,) {
  if (!url) return
  const link = document.createElement('a') // 创建a标签
  link.style.display = 'none' // 使其隐藏
  link.href = url // 赋予文件下载地址
  link.setAttribute('download', filename) // 设置下载属性 以及文件名
  document.body.appendChild(link) // a标签插至页面中
  link.click() // 强制触发a标签事件
  document.body.removeChild(link)
}

//下载文件入口(未开发完全)
export async function downloadFile(fileUrl: string, fileName?: string) {
  const blob = await getBlob(fileUrl);
  saveFile(blob, fileName);
}

//监听文件下载
export function getBlob(fileUrl: string) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', fileUrl, true);

    //监听进度事件
    xhr.addEventListener(
      'progress',
      function (evt) {
        if (evt.lengthComputable) {
          const percentComplete = evt.loaded / evt.total;
          // percentage是当前下载进度，可根据自己的需求自行处理
          const percentage = percentComplete * 100;
        }
      },
      false
    );
    xhr.responseType = 'blob';
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log('xhr.response', xhr.getResponseHeader('content-disposition'));

        resolve(xhr.response);
      }
    };
    xhr.send();
  });
}

export function saveFile(blob: any, fileName?: string) {
  // ie的下载
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName);
  } else {
    // 非ie的下载
    const link = document.createElement('a');
    const body = document.querySelector('body');

    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;

    // fix Firefox
    link.style.display = 'none';
    body?.appendChild(link);

    link.click();
    body?.removeChild(link);

    window.URL.revokeObjectURL(link.href);
  }
}

/**
 * 获取嵌套对象的所有对象的 key 对应 value值
 * @param {*} data 嵌套对象
 * @param {*} arr 存放属性数组
 * @param {*} children 保存嵌套子对象的属性
 * @param {*} key 获取的 value 对应的 key
 * @returns
 */
export function getChildValue(
  data: Array<any> = [],
  arr: Array<any> = [],
  key: string = '',
  children: string = 'children'
) {
  if (!key || data.length <= 0) return
  data.forEach(item => {
    if (item[children]) {
      getChildValue(item.children, arr, key, children)
    }
    arr.push(item[key])
  })
}

