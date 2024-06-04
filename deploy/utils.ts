
// 获取执行脚本的 NODE_ENV值
function getNodeEnv() {
    const script = process.env.npm_lifecycle_script;
    const reg = new RegExp("NODE_ENV=([a-z_\\d]+)");
    const result = reg.exec(script);
    return result[1];
};


module.exports = {
    getNodeEnv
}