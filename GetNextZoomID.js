const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'Argparse'
});

async function run(eventName) {
    const { Client } = require('@notionhq/client');

    const notion = new Client({ auth: "secret_CODE" });

    (async () => {
      const response = await notion.databases.query({
        database_id: 'ID',
        filter: {
          or: [
            {
              property: '강의명',
              "text": {
                  "contains": eventName
              }
          },
          ],
        },
      });
        prof_id = response.results[0].properties['담당 교수'].relation[0].id
//        console.log(prof_id);
        



        const prof_response = await notion.databases.query({
          database_id: 'ID',
        });
        
        for (let i=0; i < prof_response.results.length; i++) {
            if (prof_response.results[i].id == prof_id) {
                console.log(prof_response.results[i].properties.Zoom.number)
                return prof_response.results[i].properties.Zoom.number
            }
        }
    })();
}

parser.add_argument('-d', '--debug');
parser.add_argument('-c', '--class', { help: 'Next class' });

class_name = parser.parse_args()['class']
//console.log(class_name)

run(class_name)
