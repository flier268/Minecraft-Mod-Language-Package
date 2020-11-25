import { zhConvert, tw2cn, cn2tw } from 'cjk-conv';
import { tw2cn_min, cn2tw_min } from 'cjk-conv/lib/zh/convert/min.js';

import fs from 'fs';
import glob from "glob";
import path from 'path';
import Segment from 'novel-segment';

var segment = new Segment({
    autoCjk: true,
    optionsDoSegment: {
        convertSynonym: true
    },
    nodeNovelMode: true,
    all_mod: true
});

//segment.loadDict('dict.txt'); // 载入字典，详见dicts目录，或者是自定义字典文件的绝对路径
//segment.useDefault({all_mod:true});
segment.useDefault();
// 开始分词

var convert = (str) => {
    return cn2tw_min(segment.doSegment(str, { simple: true }).join(''));
};

// console.log( segment.doSegment('想要创造出炼金矩阵，使用$(item)奥术粉灰$()右击地面（所有坚硬方块的表面均可）—— 这会扣除 1 点 的 $(item)奥术粉灰$()耐久，并绘制出一个炼金矩阵。但炼金矩阵本身并无太大用处。$(bl2)当你手持物品右键炼金矩阵时，矩阵会消耗你手中的一个物品，并将其放置到矩阵当中。被置入的物品决定了炼金矩阵的效果。', { simple: true }));



// 所有zh_cn/*.json 轉為zh_tw/*.json
glob("../../projects/**/zh_cn/**/*.json", function (er, files) {
    files.forEach(file => {
        let cn = fs.readFileSync(file, 'utf8');
        let tw = convert(cn);
        let filename_new = file.replace('zh_cn', 'zh_tw');
        fs.mkdirSync(path.dirname(filename_new), { recursive: true }, (err) => {
            if (err) throw err;
        });
        fs.writeFileSync(filename_new, tw, error => {
            console.log(erro);
        });
    });
});

// 所有zh_cn.json 轉為zh_tw.json

glob('../../projects/**/zh_cn.json', function (er, files) {
    files.forEach(file => {
        let cn = fs.readFileSync(file, 'utf8');
        let tw = convert(cn);
        fs.writeFileSync(`${path.dirname(file)}/zh_tw.json`, tw, error => {
            console.log(erro);
        });
    });
});
console.log('Done');