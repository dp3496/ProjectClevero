// block to handle date change
exports.datechange = function () {
    var d = new Date();
    var dty = (d.getMonth() + 1) + "/" + (d.getDate() - 1) + "/" + d.getFullYear();
    var dtt = (d.getMonth() + 1) + "/" + (d.getDate() + 1) + "/" + d.getFullYear();
    var ydt = new Date(dty);
    var tdt = new Date(dtt);
    var darr = [];
    darr.push(ydt.toLocaleDateString());
    darr.push(d.toLocaleDateString());
    darr.push(tdt.toLocaleDateString());
    return darr;
}