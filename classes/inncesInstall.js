const inncesSecurity = require('./inncesSecurity');
const fs = require('fs');

class inncesInstall extends inncesSecurity {

  scandir(dir) {
    let FilesList = [];
    fs.readdirSync(dir).forEach(file => {
      FilesList.push(file);
    });
    return FilesList
  }

  scan_tables() {

    let dir = __dirname + "/install/tables/";
    dir = dir.replace("/classes", "");
    let TablesList = this.scandir(dir);

    let tables_array = [];
    let sql, link;
    for (let file of TablesList) {
      link = dir + file;
      sql = fs.readFileSync(link, 'utf8');
      tables_array.push(sql);
    }
    return tables_array;
  }

  add_default_settings() {
    let defaults_sql_dir = __dirname + "/install/default_settings/defaults.txt";
    defaults_sql_dir = defaults_sql_dir.replace("/classes", "");
    let data = fs.readFileSync(defaults_sql_dir, 'utf8');
    let sql_array = data.split(";");
    let DatabaseType = this.database_type();
    if (DatabaseType === 'mysql') {
      for (let sql of sql_array) {
        this.insert_data(sql);
      }

    } else if (DatabaseType === 'sqlite') {
      for (let sql of sql_array) {
        this.lite_insert_data(sql);
      }
    }

  }

  execute_installation() {
    let DatabaseType = this.database_type();
    //scan tables
    let tables_array = this.scan_tables();
    //install tables
    if (DatabaseType === 'mysql') {

      for (let table of tables_array) {
        this.create_table(table);
      }

    } else if (DatabaseType === 'sqlite') {
      for (let table of tables_array) {
        this.lite_create_table(table);
      }

    }


    //install default settings
    this.add_default_settings();
  }
}

module.exports = inncesInstall