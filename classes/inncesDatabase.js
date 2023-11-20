const mysql = require('mysql');
const util = require('util');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');

class InncesDatabase {

    test() {
        console.log('test working fine');
    }

    create_table(sql) {
        let db = this.database_info();
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log('table creation success');
        });
    }

    database_info() {
        const db = mysql.createConnection({
            host: 'localhost',
            user: 'newuser',
            password: '123456',
            database: 'nodejs'
        });

        db.connect((err) => {
            if (err) {
                throw err;
            }
            console.log('connected to database successful');
        });

        return db;
    }

    insert_data(sql) {
        let db = this.database_info();
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log('insertion success');
        });
    }

    update_data(sql) {
        let db = this.database_info();
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log('update success');
        });
    }

    delete_data(sql) {
        let db = this.database_info();
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result);
            console.log('deletion success');
        });
    }

    async select_data(sql) {
        let db = this.database_info();
        const query = util.promisify(db.query).bind(db);
        const rows = await query(sql);
        return rows;
    }

    lite_database_info() {
        const LiteDB = new sqlite3.Database('database/mydb.db');
        return LiteDB;
    }

    lite_create_table(sql) {
        const LiteDB = this.lite_database_info();
        LiteDB.run(sql);
        console.log('table created successfuly');
        LiteDB.close();
    }

    lite_insert_data(sql) {
        const LiteDB = this.lite_database_info();
        LiteDB.run(sql);
        LiteDB.close();
    }

    lite_delete_data(sql) {
        const LiteDB = this.lite_database_info();
        LiteDB.run(sql);
        LiteDB.close();
    }

    lite_update_data(sql) {
        const LiteDB = this.lite_database_info();
        LiteDB.run(sql);
        LiteDB.close();
    }

    async lite_select_data(sql) {
        let LiteDB = this.lite_database_info();
        const query = util.promisify(LiteDB.all).bind(LiteDB);
        const rows = await query(sql);
        LiteDB.close();
        return rows;
    }

    tables_operations(sql) {
        let DatabaseType = this.database_type();
        if (DatabaseType === 'mysql') {

            let db = this.database_info();
            let query = db.query(sql, (err, result) => {
                if (err) throw err;
                console.log(result);
            });

        } else if (DatabaseType === 'sqlite') {
            const LiteDB = this.lite_database_info();
            LiteDB.run(sql);
            console.log('table created successfuly');
            LiteDB.close();
        }

    }

    database_type() {
        let DatabaseType = 'sqlite';
        return DatabaseType;
    }

    async mogo_db_info(MongoDB_URI) {
        try {
            const conn = await mongoose.connect(MongoDB_URI);
            console.log(`MongoDB connected : ${conn.connection.host}`);
        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    }


}

module.exports = InncesDatabase