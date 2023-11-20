const inncesForms = require('./inncesForms');

class inncesTables extends inncesForms {

    ObjectLastKey(Object) {
        let lastElement;
        for (lastElement in Object)
            lastElement;
        return lastElement;
    }

    update_row(post, table, field) {
        field_val = post[field];
        delete post[field];
        let val, elements;
        for (key in post) {
            val = post[key];
            if (this.ObjectLastKey(post) === key) {
                elements += key + " = " + "'" + val + "' ";
            } else {
                elements += key + " = " + "'" + val + "', ";
            }
        }
        let sql = `update ${table} set ${elements} where ${field} = '${field_val}'`;
        this.update_data(sql);
    }

    lite_update_row(post, table, field) {
        field_val = post[field];
        delete post[field];
        let val, elements;
        for (key in post) {
            val = post[key];
            if (this.ObjectLastKey(post) === key) {
                elements += key + " = " + "'" + val + "' ";
            } else {
                elements += key + " = " + "'" + val + "', ";
            }
        }
        let sql = `update ${table} set ${elements} where ${field} = '${field_val}'`;
        this.lite_update_data(sql);
    }

    insert_row(post, table) {
        let keys_ins = "(";
        for (key in post) {
            if (this.ObjectLastKey(post) === key) {
                keys_ins += key;
            } else {
                keys_ins += key + ", ";
            }
        }
        keys_ins += ") ";

        vals_ins = "values (";
        let val;
        for (let key in post) {
            val = post[key];
            if (this.ObjectLastKey(post) === key) {
                vals_ins += "'" + val + "'";
            } else {
                vals_ins += "'" + val + "'" + ", ";
            }
        }

        vals_ins += ")";
        let sql = `insert into ${table} ${keys_ins} ${vals_ins}`;
        this.insert_data(sql);
    }

    lite_insert_row(post, table) {
        let keys_ins = "(";
        for (key in post) {
            if (this.ObjectLastKey(post) === key) {
                keys_ins += key;
            } else {
                keys_ins += key + ", ";
            }
        }
        keys_ins += ") ";

        vals_ins = "values (";
        let val;
        for (let key in post) {
            val = post[key];
            if (this.ObjectLastKey(post) === key) {
                vals_ins += "'" + val + "'";
            } else {
                vals_ins += "'" + val + "'" + ", ";
            }
        }

        vals_ins += ")";
        let sql = `insert into ${table} ${keys_ins} ${vals_ins}`;
        this.lite_insert_data(sql);
    }

    del_row(table, field, val) {
        let sql = `delete from ${table} where ${field} = '${val}'`;
        this.delete_data(sql);
    }

    lite_del_row(table, field, val) {
        let sql = `delete from ${table} where ${field} = '${val}'`;
        this.lite_delete_data(sql);
    }


    async get_row(table, field, val) {
        let sql = `select * from ${table} where ${field} = '${val}'`;
        let row = await this.select_data(sql);
        return row[0];
    }

    async lite_get_row(table, field, val) {
        let sql = `select * from ${table} where ${field} = '${val}'`;
        let row = await this.lite_select_data(sql);
        return row[0];
    }

    async get_row_sql(sql) {
        let row = await this.select_data(sql);
        return row[0];
    }

    async lite_get_row_sql(sql) {
        let row = await this.lite_select_data(sql);
        return row[0];
    }

    async check_exists(table, field, val)
    {
        let sql = `SELECT COUNT(*) AS num_rows FROM ${table} WHERE ${field} = '${val}'`;
        let result = await this.select_data(sql);
        let num_rows = result[0];
        return num_rows;
    }

    async lite_check_exists(table, field, val)
    {
        let sql = `SELECT COUNT(*) AS num_rows FROM ${table} WHERE ${field} = '${val}'`;
        let result = await this.select_data(sql);
        let num_rows = result;
        return num_rows;
    }

    async check_exists_sql(sql)
    {
        let result = await this.select_data(sql);
        let num_rows = result.length
        return num_rows;
    }

    async lite_check_exists_sql(sql)
    {
        let result = await this.lite_select_data(sql);
        let num_rows = result.length
        return num_rows;
    }

    async check_exists_where(table, sql_where)
    { 
        let sql = `SELECT COUNT(*) AS num_rows FROM ${table} WHERE ${sql_where}`;
        let result = await this.select_data(sql);
        let num_rows = result[0];
        return num_rows;
    }

    async lite_check_exists_where(table, sql_where)
    {
        let sql = `SELECT COUNT(*) AS num_rows FROM ${table} WHERE ${sql_where}`;
        let result = await this.lite_select_data(sql);
        let num_rows = result;
        return num_rows;
    }

}

module.exports = inncesTables