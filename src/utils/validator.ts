export const checkEmail = (rule: any, value: string, cb: any) => {
  //验证邮箱的正则表达式
  const regEmail = /^\w+([-+.]\w+)*@tcl.com$/;
  if (regEmail.test(value)) {
    //合法的邮箱
    return cb();
  }
  cb(new Error("请输入合法的邮箱"));
};

export const checkUserName = (rule: any, value: string, cb: any) => {
  //验证邮箱的正则表达式
  const regEmail = /^\w+([-+.]\w+)*(@tcl.com)?$/;
  if (regEmail.test(value)) {
    //合法的邮箱
    return cb();
  }
  cb(new Error("请输入合法的邮箱"));
};
