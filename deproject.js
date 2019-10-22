/* Sản phẩm đã xem*/
function history() {
    if (typeof (Storage) != 'undefined') {
        if (localStorage.length > 0) {
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
    }
    else {
        alert('Trình duyệt của bạn không hỗ trợ Storage')
    }
}
/*link dẫn */
$(document).ready(function() {
    loadAjax(getKey());
});

function getKey() {
    var currentUrl = window.location.href;
    currentUrl = new URL(currentUrl);
    var key = currentUrl.searchParams.get('key');
    return key;
}

function loadAjax(k) {
    $.ajax({
        url: "https://api.myjson.com/bins/" + k,
        method: "GET",
        success: function(res) {
            var user={
                "name": res.name,
                "picture":res.picture.img2,
                "prince":res.prince,
                "online": res.online,
                "per": res.per
            }         
            if(typeof(Storage)!="undefined"){
                localStorage.setItem(k,JSON.stringify(user));
            }   else{
                alert("sorry! No web storage support")
            }    
            var html = "";
            html="<h3>"+res.name+"</h3>"
            $(".product-content").prepend(html);
                html="<img src='"+res.picture.img1+"'>"+
                    "<img src='"+res.picture.img2+"'>"
            $(".slider-for").prepend(html);        
            html="<img src='"+res.picture.img1+"'>"+
                "<img src='"+res.picture.img2+"'>"
            $(".slider-nav").prepend(html);
            PictureSlick();
            html="<p><b>"+res.prince+"<sup><u>đ</u></sup></b></p>"
            $(".find").append(html);
            html="<h5>MUA ONLINE GIẢM SỐC " +res.per+ " CÒN</h5>"+
            "<h4>"+res.online+"<sup><u>đ</u></sup></h4>";
            $(".discount-online").append(html);
            html="<div class='img-product' style='"+
            "background-image: url("+res.picture.img+");"+
            "background-size: contain;"+
            "background-position: center;"+
            "background-repeat: no-repeat'></div>";
            $(".picture-img-product").append(html);
            html="<h5>thông số kĩ thuật</h5>"+
            "<ul>"+
                "<li> <p><b>Kiểu tủ: </b>"+res.parameter.a+"</p></li>"+
                "<li> <p><b>Dung tích: </b>"+res.parameter.b+"</p></li>"+
                "<li> <p><b>Số người sử dụng: </b>"+res.parameter.c+"</p></li>"+
                "<li> <p><b>Công nghệ Inverter: </b><span>"+res.parameter.d+"</span></p></li>"+
                "<li> <p><b>Điện tiêu thụ: </b>"+res.parameter.e+"</p></li>"+
                "<li> <p><b>Tiện ích: </b><span>"+res.parameter.f+"</span></p></li>"+
                "<li> <p><b>Công nghệ làm lạnh: </b><span>"+res.parameter.g+"</span></p></li>"+
                "<li> <p><b>Công nghệ kháng khuẩn khử mùi:</b> <span>"+res.parameter.h+"</span></p></li>"+
                "<li> <p><b>Nơi sản xuất: </b>"+res.parameter.i+"</p></li>"+
                "<li> <p><b>Năm ra mắt: </b>"+res.parameter.k+"</p></li>"+
                "<li> <p><b>Hãng: </b>"+res.parameter.j+"</p></li>"+
            "</ul>";
            $(".details").prepend(html);
            html="<h4>"+ res.name2+"</h4>"+
                "<p>"+ res.p1+"</p>"+
                "<div class='img-product1' style='"+
                "background-image: url("+res.picture.img1+");"+
                "background-size: contain;"+
                "background-position: center;"+
                "background-repeat: no-repeat'>"+
                "</div>";
            html+="<h4>"+ res.name3+"</h4>"+
                "<p>"+res.p3 +"</p>"+
                "<div class='img-product1' style='"+
                "background-image: url("+res.picture.img3 +");"+
                "background-size: contain;"+
                "background-position: center;"+
                "background-repeat: no-repeat'>"+
                "</div>";
            html+="<h4>"+ res.name4+"</h4>"+
                "<p>"+ res.p4+"</p>"+
                "<div class='img-product1' style='"+
                "background-image: url("+ res.picture.img4 +");"+
                "background-size: contain;"+
                "background-position: center;"+
                "background-repeat: no-repeat'>"+
                "</div>";
            html+="<h4>"+ res.name5+"</h4>"+
                "<p>"+ res.p5+"</p>"+
                "<div class='img-product1' style='"+
                "background-image: url("+res.picture.img5 +");"+
                "background-size: contain;"+
                "background-position: center;"+
                "background-repeat: no-repeat'>"+
                "</div>";
                $(".details2-child").prepend(html);
                history();
        },
        error: function(err) {
            console.log(err);
        }
    });
}
/* submenu*/
$(function(){
    $("li").mouseover(function(){
        $(this).find(".submenu").css("display","block")
    });
    $("li").mouseout(function(){
        $(this).find(".submenu").css("display","none")
    })
})
 /*Slick Image*/
function PictureSlick(){
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        
        asNavFor: '.slider-nav'
      });
      $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        focusOnSelect: true
      });
};
  /*Menu bars*/
$(".bars-menu").click(function (){
    $(".bars-menu-child").addClass("active-bars")
})
$(".Cancel").click(function(){
    $(".bars-menu-child").removeClass("active-bars")
})
/*note*/
$(".add2").click(function(){
    $(".note-add").css("height","auto");
    $(".add2>span").css("display","none")
})
/*Đọc thêm chi tiết*/
$(".add").click(function(){
    $(".details2-child").css("height","auto");
    $(".add").css("display","none");
    $(".details2-child").css("border-bottom","1px solid #80808045")
})