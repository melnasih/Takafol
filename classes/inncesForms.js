const inncesLang = require('./inncesLang');

class inncesForms extends inncesLang {

    is_array(arr) {
      let result = Array.isArray(arr);
      return result;
    }

    isObject(o) {
        return null != o && 
          typeof o === 'object' && 
          Object.prototype.toString.call(o) === '[object Object]';
      }

    serialized_array_to_object(array) {
         let fin = {};
        for (let val of array) {
            fin[val['name']] = val['value'];
        }
        return fin;
    }

    convert_normal_post_to_sql(post) {
        let txt_sql = '';
        let val = '';
        for (let key in post) {
            val = post[key];
            if (this.object_last_val(post) === val) {
                txt_sql += `${key} = '${val}'`;
            } else {
                txt_sql += `${key}='${val}' AND `;
            }

        }
        return txt_sql;
    }

    array_last_val(arr) {
       let result = arr[arr.length - 1];
       return result;
    }

    convert_array_to_sql(sql_array) {
        let sql = '';
        let val_sql;
        for (let key in sql_array) {
            val_sql = sql_array[key];
            if (this.array_last_val(sql_array) === val_sql) {
                sql += val_sql + " ";
            } else {
                sql += val_sql + " AND ";
            }

        }
        return sql;
    }

    object_last_key (obj) {
        let last = Object.keys(obj)[Object.keys(obj).length-1];
        return last;
    }

    object_last_val (obj) {
        let last = Object.keys(obj)[Object.keys(obj).length-1];
        let last_val = obj[last];
        return last_val;
    }
    object_fillter(obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key] == null || obj[key] == '') {
              delete obj[key];
            }
          });
          return obj
    }

    object_key_exists(key, object) {
        let result = key in object;
        return result;
    }

    normal_inputs_sql(post) {
       // post = array_filter(post);
       post = this.object_fillter(post);
       let txt_sql = null;
       let  date_sql = null;
       let date_array ={};
        if (this.object_key_exists('date_from', post)) {
            date_array.date_from = post['date_from'];
            delete post['date_from'];
        }
        if (this.object_key_exists('date_to', post)) {
            date_array['date_to'] = post['date_to'];
            delete post['date_to'];
            if (this.isObject(date_array)) {
                date_sql = `reg_date BETWEEN '${date_array.date_from}' AND '${date_array.date_to}' `;
            }
        }
        txt_sql = this.convert_normal_post_to_sql(post);

        let sql_array = [txt_sql, date_sql];
        sql_array = this.array_filter(sql_array);
        let sql = this.convert_array_to_sql(sql_array);
        return sql;
    }

    array_filter(arr) {
        let final_arr=[];
        for(let val of arr) {
          if(val != '' && val != null) {
            final_arr.push(val); 
          }
        }
        return final_arr;
    }

 

    serialize_multi_choice_to_array(array) {
        if (is_array(array)) {
            let fin = [];
            for (let val of array) {
                fin.push(val['value'].trim());

            }
        }
        return fin;
    }



    val_is_array_OR_AND(key, val) {
        if (is_array(val)) {
            txt_sql += "(";
            let val_sub;
            for (val_sub of val) {
                if (this.array_last_val(val) === val_sub) {

                    txt_sql += key + "='" + val_sub + "'";

                } else {

                    txt_sql += key + "='" + val_sub + "' OR ";
                }
            }
            txt_sql += ")";

        }
        return txt_sql;
    }

    strip_tags(input) {
        let cleanText = input.replace(/<\/?[^>]+(>|$)/g, "");
        return cleanText;
    }

    strip_array_data(post) {
        let val;
        let data = {};
        for (let key in post) {
            val = post[key];
            data[key] = this.strip_tags(val);
        }
        return $data;
    }

    objectLen(ob) {
        objectLenght = Object.keys(ob).length;
        return objectLenght;
    }

    multi_into_rows(post, num_rows) {
        let data = this.serialize_multi_array(post);
        for (key in data) {
            keys.push(key);
        }
        let rows;
        let len = this.objectLen(data);
        for ($y = 0; num_rows > y; y++) {

            for (x = 0; len > x; x++) {
                row[keys[$x]] = data[keys[x]][y];
                row[keys[$x]] = data[keys[x]][y];
                row[keys[$x]] = data[keys[x]][y];
            }
            rows.push(row);
        }
        return rows;
    }

    serialize_multi_array(post) {
        let val;
        for (key in post) {
            val = post[key];
            let ar = val['name'].split("[]");
            all[ar[0]].push(val['value']);

        }
        return all;
    }




}

module.exports = inncesForms