
function toggleSearch() {
    $(".search-area").slideToggle("fast");
}

var userReviewMixin = {
    data: {
        isAddNewComment: false,
        listComment: null,
        sortOrder: 0,
        currentPage: 1,
    },
    created: function () {
        this.GetListComment();
        if (this.isAuthenticated) {
            this.GetUserComment();
        }
    },
    watch: {
        currentPage: function () {
            this.GetListComment();
        },
        sortOrder: function () {
            if (this.currentPage === 1) {
                this.GetListComment();
            }
            else {
                this.currentPage = 1;
            }
        }
    },
    methods: {
        GetListComment: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', "/Product/GetListComment/" + this.productId + "?page=" + this.currentPage + "&sortOrder=" + this.sortOrder);
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                self.listComment = data.listComment;
            }
            xhr.send();
        },
        GetUserComment: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', "/Product/GetUserComment/" + this.productId);
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                self.userComment = data.userComment;
            }
            xhr.send();
        },
        AddNewComment: function () {
            this.isAddNewComment = !this.isAddNewComment;
        },
        DoneComment: function () {
            this.isAddNewComment = false;
            ShowAlertDialog(cmtSuccessMsg);
            this.GetListComment();
            this.GetUserComment();
        },
        Upvote: function (comment) {
            if (comment.Rate === 1) {
                comment.Upvote--;
                comment.Rate = 0;
            }
            else {
                if (comment.Rate === 0) {
                    comment.Upvote++;
                }
                else {
                    comment.Upvote++;
                    comment.Downvote--;
                }
                comment.Rate = 1;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/Product/RateComment/" + comment.Id, true);
            var formData = new FormData();
            formData.append("rateUp", "true");
            xhr.send(formData);
        },
        Downvote: function (comment) {
            if (comment.Rate === 2) {
                comment.Downvote--;
                comment.Rate = 0;
            }
            else {
                if (comment.Rate === 0) {
                    comment.Downvote++;
                }
                else {
                    comment.Upvote--;
                    comment.Downvote++;
                }
                comment.Rate = 2;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', "/Product/RateComment/" + comment.Id, true);
            var formData = new FormData();
            formData.append("rateUp", "false");
            xhr.send(formData);
        },
    }
}

var vmShoppingCart = {
    created: function () {
        this.GetCart();
    },
    methods: {
        GetCart: function () {
            var xhr = new XMLHttpRequest();
            var self = this;
            xhr.open('GET', "/ShoppingCart/ListJson");
            xhr.onload = function () {
                var data = JSON.parse(xhr.responseText);
                self.cart = data.cart;
            }
            xhr.send();
        }
    },
    computed: {
        totalItems: function () {
            var self = this;
            var key = 'Quantity';
            if (self.cart) {
                return self.cart.reduce(function (total, item) {
                    return total + item[key]
                }, 0);
            }
            else {
                return 0;
            }
        },
        sumMoney: function () {
            var key1 = 'Price';
            var key2 = 'Quantity';
            var self = this;
            if (self.cart !== null) {
                return self.cart.reduce(function (total, item) {
                    return total + item[key1] * item[key2]
                }, 0)
            }
            else {
                return 0;
            }
        },
        getTotalPrice: function () {
            return this.sumMoney - this.discountValue;
        }
    }
}

$('.view-button').click(function () {
    var currView = $(this).data("type")
    if (currView === 'list') {
        $('#content .product-layout').attr('class', 'product-layout product-list col-xs-12');
        $('#list-view').addClass('active');
        $('#grid-view').removeClass('active');
    }
    else {
        $('#content .product-layout').attr('class', 'product-layout product-grid col-lg-4 col-md-4 col-sm-6 col-xs-12');
        $('#grid-view').addClass('active');
        $('#list-view').removeClass('active');
    }
    $.cookie("CurrentView", currView);
});

$('#Order').change(function () {
    window.location.href = UpdateQueryStringParameter('order', $(this).val());
})

$('#paymentDiv').click(function () {
    alert(1);
    console.log(1);
});

function BuyNow() {
    var datastring = $("#version_form").serialize();

    $.ajax({
        type: "POST",
        url: "/ShoppingCart/AddToCart",
        data: datastring,
        success: function (data) {
            //$('#product_modal_info').html(data);
            //AddToCartSuccess();
            UpdateCartNumber();
            window.location.href = "/ShoppingCart/List";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

function AddToCart() {
    var datastring = $("#version_form").serialize();

    $.ajax({
        type: "POST",
        url: "/ShoppingCart/AddToCart",
        data: datastring,
        success: function (data) {
            $('#product_modal_info').html(data);
            AddToCartSuccess();
            UpdateCartNumber();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
}

$('#btn-toggle-menu').click(function () {
    switch ($(this).data('toggle')) {
        case 'show':
            $('.account-side-menu').css({ left: 0 });
            $('#btn-toggle-menu').css({ left: 300 });
            $('#btn-toggle-menu .fa').attr('class', 'fa fa-chevron-left');
            $(this).data('toggle', 'hide');
            break;
        case 'hide':
            $('.account-side-menu').css({ left: -300 });
            $('#btn-toggle-menu').css({ left: 0 });
            $('#btn-toggle-menu .fa').attr('class', 'fa fa-chevron-right');
            $(this).data('toggle', 'show');
            break;
    }

})

$('#search-btn').click(function (e) {
    $('#search-form').toggle();
    $('#search-form').addClass("active");
    $('#search-form').focus();
    e.stopPropagation();
});

$('body').click(function (e) {
    var container = $('#search-form');
    if (container.hasClass("active")) {
        if (e.target != $('#search-form') && !$(e.target).parents('#search-form').length) {
            container.removeClass("active");
            $('#search-form').hide();
        }
    }

});

function AddToWishlistSuccess(data) {
    UpdateWishlistNumber();

}

function AddToCartSuccess(data) {
    $('#product_modal_info').html(data);
    $('#addToCartModal').modal('show');
    //$('#addToCartModal').css({
    //    "opacity": "1"
    //});
    //vmMenuCart.GetCart();
    UpdateCartNumber();
}


function RemoveFromWishlistSuccess(data) {
    location.reload();
}

function SignupNewsletterSuccess(data) {
    $('#newsletter').html('<p>' + data.message + '</p>')
}

function ChangeUrl(object) {
    if (typeof (history.pushState) != "undefined") {
        var url, index = document.URL.indexOf('?');
        if (index > 0) {
            url = document.URL.substr(0, index);
        }
        else
            url = document.URL;
        var isFirstAtt = true;
        for (var i in object) {
            if (object.hasOwnProperty(i)) {
                if (isFirstAtt) {
                    if (object[i] != '') {
                        url += "?" + i + "=" + object[i];
                        isFirstAtt = false;
                    }
                }
                else {
                    url += object[i] != '' ? "&" + i + "=" + object[i] : "";
                }
            }
        }

        history.pushState({}, null, url);
        window.location.href = url;
    }
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}