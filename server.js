const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:true}));

// 测试路由，用来验证服务是否正常
app.get('/test', (req, res)=>{
  res.send('服务成功跑起来啦！');
})

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/submit', (req,res)=>{
  const data = req.body;
  const content = `
姓名:${data.name || '未填写'}
性别:${data.gender || '未填写'}
活动:${data.activity || '未填写'}
意见建议:${data.description || '未填写'}
--------------------------
  `;
  const filePath = path.join(__dirname,'submissions.txt');
  fs.appendFile(filePath,content,(err)=>{
    if(err) throw err;
    res.send("提交成功！");
  })
})

app.listen(port,()=>{
  console.log(`Server running on http://localhost:${port}`);
})
