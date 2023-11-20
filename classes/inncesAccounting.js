const inncesDatabase = require('./inncesDatabase');

class inncesAccounting extends inncesDatabase {

      check_numeric(val) {
        let data;
        if(!isNaN(val)) {
            data = val;
        }else{ 
            data = 0;
        }
        return data;
      }

       get_increasement_deficit_val (current, target) {
        let fy;
        let final;
        if(target > 0) {
            fy = this.convert_to_plus (current) - target;
        if(fy > 0 ) {
        final =`مقدار الزياده ${fy}`;
        }
        else{
          final =`مقدار النقص ${fy}`;
        }        
      }
      final = final.replace('-' , '');
      return final
    }

    convert_to_plus (num) {
      if(num < 0){
         num = num * -1; 
      }
        return num;
        
    }

    car_weight_kg_tn (data) {
      let num = (data / 1000).toFixed(3);
      let ndata = num.split('.');
      return ndata;
    }


}

module.exports = inncesAccounting;