/*menu*/
var y = "";
function tabl(key1, key) {
    $(".my-layout").css("display", "none");
    $("#" + key).css("display", "flex");
    $(".button").css("display", "none");
    $("." + key).css("display", "block");
    $("a").removeClass("active");
    $("." + key1).addClass("active")
}
/* Sản phẩm đã xem*/
function history() {
    if (typeof (Storage) != 'undefined') {
        if (localStorage.length > 0) {
            $("#child>p").css("display","none")
            for (i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var user = JSON.parse(localStorage.getItem(key));
                var html = "";
                html += "<li>" +
                    "<div class='my-picture' style='" +
                    "background-image: url(" + user.picture + ");" +
                    "background-size: contain;" +
                    "background-position: center;" +
                    "background-repeat: no-repeat;' title='" + user.name + "'>" +
                    "</div>" +
                    "</a>" +
                    "<div class='info' title='" + user.name + "'>" +
                    "<p class='product-name'>" + user.name + "</p>" +
                    "<div class='info-product'>" +
                    "<p class='discount'>" + user.online + "<sup><u>đ</u></sup></p>";
                if (user.prince != "" && user.prince != undefined) {
                    html += "<p class='price'><del>" + user.prince + "<sup><u>đ</u></sup></del>" +
                        "<span class='discount'> (" + user.per + ")</span>" +
                        "</p>"
                }
                html += "</div>"
                if (user.bonus != "" && user.bonus != undefined) {
                    if (user.bonus == 'Giá rẻ online') {
                        html += "<p class='bonus'> " + user.bonus + " <span class='discount'>" + user.onl + "<sup><u>đ</u></sup></span>";
                    }
                    if (user.bonus == 'PMH trừ tiền') {
                        html += "<p class='bonus'>" + user.bonus + " <b>" + user.b + "<sup><u>đ</u></sup></b></p>";
                    }
                    if (user.bonus != 'PMH trừ tiền' && user.bonus != 'Giá rẻ online') {
                        html += "<p class='bonus'> " + user.bonus + " <sup><u>đ</u></sup></p>";
                    }
                }
                html += "</div>" +
                    "</li>";
                $("#child>ul").prepend(html)
            }
        }
        else {
            html = "<p class='nope'><i> Bạn chưa coi sản phẩm nào</i></p>"
            $("#child").prepend(html);
        }
    }
    else {
        alert('Trình duyệt của bạn không hỗ trợ Storage')
    }
}
/* content morefind*/
function CallAjax() {
    $.ajax({
        url: "https://api.myjson.com/bins/liihj",
        method: "GET",
        success: function (e) {
            var html = "";
            html += "<ul>" +
                "<span> Tìm kiếm nhiều: </span>"
            for (var i = 0; i < e.length; i++) {
                html += "<li>" + e[i] + "</li>"
            }
            html += "</ul>" +
                '<div class="clearfix"></div>';
            $(".morefind").append(html)
        },
        error: function (e) {
            console.log(e);
        }
    })
}
/*ajax gid*/
function AjaxGid(k) {
    $.ajax({
        url: "https://api.myjson.com/bins/" + k,
        method: "GET",
        success: function (e) {
            var html = "";
            html += "<ul id='" + k + "' class='my-layout'>"
            for (i = 1; i < 13; i++) {
                html += "<li>" +
                    "<a href='deproject.html?key=" + e[i].key + "'>" +
                    "<div class='my-picture' style='" +
                    "background-image: url(" + e[i].linkimage + ");" +
                    "background-size: contain;" +
                    "background-position: center;" +
                    "background-repeat: no-repeat;' title='" + e[i].nameproduct + "'>" +
                    "</div>" +
                    "</a>" +
                    "<div class='info' title='" + e[i].nameproduct + "'>" +
                    "<p class='product-name'>" + e[i].nameproduct + "</p>" +
                    "<div class='info-product'>" +
                    "<p class='discount'>" + e[i].discount + "<sup><u>đ</u></sup></p>";
                if (e[i].prince != "" && e[i].prince != undefined) {
                    html += "<p class='price'><del>" + e[i].prince + "<sup><u>đ</u></sup></del>" +
                        "<span class='discount'> (" + e[i].percent + ")</span>" +
                        "</p>"
                }
                html += "</div>"
                if (e[i].bonus != "" && e[i].bonus != undefined) {
                    if (e[i].bonus == 'Giá rẻ online') {
                        html += "<p class='bonus'> " + e[i].bonus + " <span class='discount'>" + e[i].online + "<sup><u>đ</u></sup></span>";
                    }
                    if (e[i].bonus == 'PMH trừ tiền') {
                        html += "<p class='bonus'>" + e[i].bonus + " <b>" + e[i].b + "<sup><u>đ</u></sup></b></p>";
                    }
                    if (e[i].bonus != 'PMH trừ tiền' && e[i].bonus != 'Giá rẻ online') {
                        html += "<p class='bonus'> " + e[i].bonus + " <sup><u>đ</u></sup></p>";
                    }
                }
                html += "</div>" +
                    "</li>";
            }
            html += "</ul>" +
                "<div class='paging'>" +
                "<div class='button " + k + "' onclick= AddProduct('" + k + "')>Xem thêm sản phẩm  " +
                "<i class='fas fa-caret-down'></i>" +
                "</div>" +
                "</div>"
            $("#gid").append(html);
            $("#" + y).css("display", "flex")
            $("." + y).css("display", "block")
        },
        error: function (e) {
            console.log(e);
        }
    })
}
/*Thêm sản phẩm*/
function AddProduct(b) {
    $.ajax({
        url: "https://api.myjson.com/bins/" + b,
        method: "GET",
        success: function (e) {
            var html = "";
            for (i = 13; i < e.length; i++) {
                html += "<li>" +
                    "<div class='my-picture' style='" +
                    "background-image: url(" + e[i].linkimage + ");" +
                    "background-size: contain;" +
                    "background-position: center;" +
                    "background-repeat: no-repeat;' title='" + e[i].nameproduct + "'>" +
                    "</div>" +
                    "<div class='info' title='" + e[i].nameproduct + "'>" +
                    "<p class='product-name'>" + e[i].nameproduct + "</p>" +
                    "<div class='info-product'>" +
                    "<p class='discount'>" + e[i].discount + "<sup><u>đ</u></sup></p>";
                if (e[i].prince != "" && e[i].prince != undefined) {
                    html += "<p class='price'><del>" + e[i].prince + "<sup><u>đ</u></sup></del>" +
                        "<span class='discount'> (" + e[i].percent + ")</span>" +
                        "</p>"
                }
                html += "</div>"
                if (e[i].bonus != "" && e[i].bonus != undefined) {
                    if (e[i].bonus == 'Giá rẻ online') {
                        html += "<p class='bonus'> " + e[i].bonus + " <span class='discount'>" + e[i].online + "<sup><u>đ</u></sup></span>";
                    }
                    if (e[i].bonus == 'PMH trừ tiền') {
                        html += "<p class='bonus'>" + e[i].bonus + " <b>" + e[i].b + "<sup><u>đ</u></sup></b></p>";
                    }
                    if (e[i].bonus != 'PMH trừ tiền' && e[i].bonus != 'Giá rẻ online') {
                        html += "<p class='bonus'> " + e[i].bonus + " <sup><u>đ</u></sup></p>";
                    }
                }
                html += "</div>" +
                    "</li>";
            }
            $("#" + b).append(html);
            $("." + b).css("visibility", "hidden")
            $("." + b).css("height", "0")
        },
        error: function (e) {
            console.log(e);
        }
    })
}
/*Call AjaxGid*/
function CallAjaxGid() {
    $.ajax({
        url: "https://api.myjson.com/bins/655lb",
        method: "GET",
        success: function (a) {
            var htm = "";
            for (i = 0; i < a.length; i++) {
                htm += "<a class= 'pass" + a[i].key + "' onclick= tabl('pass" + a[i].key + "','" + a[i].key + "')>" + a[i].name + "</a>";
            }
            $('#menu').append(htm)
            for (j = 0; j < 3; j++) {
                AjaxGid(a[j].key);
            }
            $('.pass' + a[0].key).addClass("active");
            y = a[0].key;
        },
        error: function (a) {
            console.log(a);
        }
    })
}
/*Load Data*/
$(document).ready(function () {
    CallAjax();
    CallAjaxGid();
    history();
})
$(function () {
    $("li").mouseover(function () {
        $(this).find(".submenu").css("display", "block")
    });
    $("li").mouseout(function () {
        $(this).find(".submenu").css("display", "none")
    })
})
/*conten slick slide*/
$(document).ready(function () {
    $('.single-item').slick();
})
/*Menu bars*/
$(".bars-menu").click(function () {
    $(".bars-menu-child").addClass("active-bars")
})
$(".Cancel").click(function () {
    $(".bars-menu-child").removeClass("active-bars")
})
/* LocalStorage*/