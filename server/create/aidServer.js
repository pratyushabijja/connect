Meteor.methods({addAid: function (aid) {

    //TO-DO: remove check()
    check(aid, Object);
    /*check (aid_category_id,String);
     check (aid_name,String);*/
    var data = {
        "aidName": aid.aid_name,
        "aidCategoryId": aid.aid_category_id
    }
    //TO-DO: return one record
    var aidExists=Aid.find({aidName: aid.aid_name}).fetch();

    console.log('aidExists - '+aidExists.length);
    var length = aidExists.length;
    if (length===0) {
        Aid.insert(data, function (error, result) {

            console.log("Aid find " + JSON.stringify(Aid.find().fetch()));
            if (error) {
                console.log("Errors !!" + error + "  Result - " + result);
                //TO-DO: error message()
                // throw new Meteor.Error("insert-failed", error.message);    });
                throw new Meteor.Error("insert-failed", error);
            }
        });
    }
    else
        throw new Meteor.Error("Aid already exists");

    return true;

   // return Aid.insert(data);
}});