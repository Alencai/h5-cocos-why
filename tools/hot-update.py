import hashlib
import os
import os.path
import re
import time
import shutil 

# 检测文件夹
def checkDir(path):
    if os.path.exists(path):
        return
    os.makedirs(path)

# 资源列表
assets_list = list()

# 时间戳
cur_time = str(int(time.time()))

# 文件名
name_version = '/version.manifest'
name_project = '/project.manifest'
name_ext_project = '/projects/' + cur_time + '.manifest'

# 输出文件夹
out_file = 'hot-update'
checkDir(out_file)
checkDir(out_file + '/projects')

# 获取md5
def getMD5(fileName, block_size=64 * 1024):
    with open(fileName, 'rb') as f:
        md5 = hashlib.md5()
        while True:
            data = f.read(block_size)
            if data:
                md5.update(data)
            else:
                break
        return md5.hexdigest()

# 搜索所有资源，并拷贝
def searchAssetsAndCopy(path, dst, str_list):
    for parent, dirnames, filenames in os.walk(path):
        checkDir(dst + '/' + parent)
        for filename in filenames: 
            if filename == 'cocos2d-jsb.js' or filename == '.DS_Store':
                continue
            cur_path = os.path.join(parent, filename)
            asset_md5 = getMD5(cur_path)
            asset_size = os.path.getsize(cur_path)
            asset_name = cur_path.replace('\\','/').replace('../','').replace('./','')
            str_list.append('"' + asset_name + '":{"md5":"' + asset_md5 + '","size":' + str(asset_size) + '}')
            shutil.copy(cur_path, dst + "/" + asset_name)
            print(cur_path)

# 生成热更文件
def doit(out_dir, svr_url, cdn_url, path_local):
    # 生成文件
    path_version = out_dir + name_version
    path_project = out_dir + name_project
    path_ext_project = out_dir + name_ext_project
    # 参数 
    url_package = '"packageUrl":"' + cdn_url + '",'
    url_version = '"remoteVersionUrl":"' + svr_url + name_version + '",'
    url_project = '"remoteManifestUrl":"' + cdn_url + name_ext_project + '",'
    val_version = '"version":"' + cur_time + '",'
    # 生成version文件
    with open(path_version, 'w') as file:
        file.write('{' + url_package + url_version + url_project + val_version + '"assets":{')
        file.write('}}')
    # 生成project文件
    with open(path_project, 'w') as file:
        file.write('{' + url_package + url_version + url_project + val_version + '"assets":{')
        is_need_dot = False
        for value in assets_list:
            if is_need_dot:
                file.write(',')
            else:                
                is_need_dot = True
            file.write(value)
        file.write('}}')
    # 拷贝为ext_project文件
    shutil.copy(path_project, path_ext_project)
    # 替换项目中的manifest文件
    shutil.copy(path_project, path_local)
    shutil.copy(path_project, out_dir + "/" + path_local)

searchAssetsAndCopy('src', out_file, assets_list)
searchAssetsAndCopy('res', out_file, assets_list)
searchAssetsAndCopy('subpackages', out_file, assets_list)
doit(out_file, 
    'https://test.bobojxmj.com/test/androidhot/',  # 服务器地址-版本文件   
    'https://test.bobojxmj.com/test/androidhot/',  # cdn资源地址   
    'res/raw-assets/17/1702cd67-66da-4946-8ec5-a57f9c3a8fc4.manifest'  # 更新本地-版本文件   
) 
print('success.')


