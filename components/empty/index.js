
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
// components/empty/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: String,
            value: '暂无相关商品'
        },
        btnText:{
            type:String,
            value:'去逛逛吧'
        },
        show: {
            type: Boolean,
        },
        showBtn:{
            type:Boolean
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    lifetimes: {
        attached() {
            this._init()
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _init() {
            wx.lin = wx.lin || {};
            wx.lin.showEmpty = (options) => {
                const {
                    btnText = '去逛逛吧',
                    text = '暂无相关商品',
                    showBtn = false
                } = {...options};
                this.setData({
                    btnText,
                    text,
                    showBtn,
                    show: true
                });
            };
            wx.lin.hideEmpty = () => {
                this.setData({
                    show: false
                });
            };
        },
        onTap(event) {
            wx.switchTab({
                url:`/pages/category/category`
            })
        }
    }
})