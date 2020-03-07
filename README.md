# SJTU class schedule generator

Inspired by skyzh's [SJTU Class Importer](https://github.com/skyzh/sjtu-class-table-generator.git)

This project is just for practice. But of course it works.

## How to use

### Preparation

#### Use json

1. Visit the Curriculum Query for Students page.
2. Copy the response of  URL like`http://kbcx.sjtu.edu.cn/kbcx/xskbcx_cxXsKb.html` from Developer Tool.
3. Save the response as a json file, such as `data.json`.
4. Place the json file under this project's folder.

#### Use html

It is only tested on Chrome.

1. Visit the Curriculum Query for Students page.
2. Right-click and save the page as a html file (not the source code).
3. Place the html file under this project's folder.

### Run the script

```shell
yarn install # npm i
node .
```

### Get the output

The output is `SJTU-class-schedule.ics` in the same folder.

### Import to calendar

Use your calendar app to import the ics file.