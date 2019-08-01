const fs = require('fs');
const path = require('path');


//重命名文件
fs.readdir(path.join(__dirname, 'project'), (err, files) => {
    if (err) throw err;
    let filesName = files[0]
    let filesArr = []
        // 文件数组
    const filesObj = fs.readdirSync(path.join(__dirname, 'out'))
    filesObj.forEach(function(item, index) {
        let stat = fs.lstatSync(path.join(__dirname, 'out', item))
        if (stat.isDirectory() === true && item.indexOf(filesName) == 0) {
            filesArr.push(item)
        }
    })
    let fileVersion = filesArr.length + 1;
    let filesNameVersion = filesName + '@v0.' + fileVersion + '.0';
    fs.rename(path.join(__dirname, 'out', 'test-win32-x64', ), path.join(__dirname, 'out', filesNameVersion), (err) => {
        if (err) return;
        fs.rename(path.join(__dirname, 'out', filesNameVersion, 'test.exe'), path.join(__dirname, 'out', filesNameVersion, filesName + '.exe'), (err1) => {
            if (err1) return;
            console.log('打包完成，请到out目录获取 .exe文件')
        })
    });
})

//删除中间文件
let deletePath = path.join(__dirname, "temp");
deleteFolder(deletePath);

function deleteFolder(deletePath) {
    let files = [];
    if (fs.existsSync(deletePath)) {
        files = fs.readdirSync(deletePath);
        files.forEach(function(file, index) {
            let curPath = deletePath + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(deletePath);
    }
}