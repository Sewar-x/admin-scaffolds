
/**
 * 上传规范:
 *  1. 正式服只能上传 prod 分支代码；测试服只能上传 test 分支代码;
 */
const fs = require('fs')
const path = require('path')
const utils = require('./utils.ts');
// 获取当前 git 分支名称
function getCurrentBranchName(p = process.cwd()) {
    const gitHeadPath = `${p}/.git/HEAD`

    return fs.existsSync(p)
        ? fs.existsSync(gitHeadPath)
            ? fs.readFileSync(gitHeadPath, 'utf-8').trim().split('/')[2]
            : getCurrentBranchName(path.resolve(p, '..'))
        : false
}


/**
 * git 分支检查
 * @returns 
 */
function getCheck() {
    // 获取当前 git 分支名称
    const currentBranchName = getCurrentBranchName()
    // 上传的服务器环境与 git 分支对应表: key 为上传的服务器环境, value 对应的 git 分支代码
    const envtoGitbranchMap = {
        'test': 'test',
        'production': 'master'
    }
    if (envtoGitbranchMap[utils.getNodeEnv()] !== currentBranchName) {
        console.error('请检查分支代码!!! 测试服仅能上传 test 分支代码, 正式服仅能上传 master 分支代码!!')
        return false
    }
    return true
}

module.exports = getCheck