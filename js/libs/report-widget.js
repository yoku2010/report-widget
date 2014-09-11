(function ($) {
    $.fn.extend({
        reportWidget: function (settings){
            settings = jQuery.extend({
                title: 'Report',
                rName: {},
                rData: {},
                functionBefore: function () { return true; },
                functionAfter: function () {}
            }, settings);
            return this.each(function () {
                new $.createRW(this, settings);
            });
        }
    });
    $.createRW = function (me, options) {
        var rwObj = {
            version: '0.1',
            author: 'Yogesh Kumar',
            obj: {
                $me: $(me),
                $canvas: null,
                $rName: null,
                $rSelected: null,
                $gContainer: null,
                $tContainer: null
            },
            id: {
                chart: 'chart'
            },
            cl: {
                btn: 'btn',
                icon: 'glyphicon',
                reportIcon: 'glyphicon-link',
                pnl: 'panel',
                pnlHead: 'panel-heading',
                pnlTitle: 'panel-title',
                pnlBody: 'panel-body',
                pnlFoot: 'panel-footer',
                pnlFootAlign: 'text-right',
                pnlTheme: 'panel-primary',
                dwnBtnDiv: 'btn-group',
                dwnBtnSize: 'btn-group-xs',
                dwnBtnPdf: 'btn-success',
                dwnBtnCsv: 'btn-info',
                dwnBtnPrint: 'btn-danger',
                optionBar: 'option-bar',
                rTypeDiv: 'btn-group',
                rTypeSize: 'btn-group-sm',
                rTypeBtn: 'btn-primary'
            },
            msg: {
                selectReport: 'Select Report ',
                noReport: 'No Report'
            },
            rType: ['Bar', 'Line', 'Radar', 'Polar', 'Pie', 'Doughnut'],
            dt: {
                rType: null,
                gType: 'Bar'
            },
            color: {
                bar: [
                    {
                        fillColor: 'rgba(220,220,220,0.4)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)'
                    },
                    {
                        fillColor: 'rgba(151,187,205,0.4)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)'
                    },
                    {
                        fillColor: 'rgba(180,142,173,0.4)',
                        strokeColor: 'rgba(180,142,173,1)',
                        pointColor: 'rgba(180,142,173,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(180,142,173,1)'
                    },
                    {
                        fillColor: 'rgba(8,153,46,0.4)',
                        strokeColor: 'rgba(8,153,46,1)',
                        pointColor: 'rgba(8,153,46,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(8,153,46,1)'
                    },
                    {
                        fillColor: 'rgba(200, 67, 28,0.4)',
                        strokeColor: 'rgba(200, 67, 28,1)',
                        pointColor: 'rgba(200, 67, 28,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(200, 67, 28,1)'
                    },
                    {
                        fillColor: 'rgba(255,142,24,0.4)',
                        strokeColor: 'rgba(255,142,24,1)',
                        pointColor: 'rgba(255,142,24,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(255,142,24,1)'
                    },
                    {
                        fillColor: 'rgba(0,150,171,0.4)',
                        strokeColor: 'rgba(0,150,171,1)',
                        pointColor: 'rgba(0,150,171,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(0,150,171,1)'
                    },
                    {
                        fillColor: 'rgba(195,54,168,0.4)',
                        strokeColor: 'rgba(195,54,168,1)',
                        pointColor: 'rgba(195,54,168,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(195,54,168,1)'
                    }
                ],
                pie: [
                    {
                        color:'#E51400',
                        highlight: '#FA3A27'
                    },
                    {
                        color: '#60A917',
                        highlight: '#79C330'
                    },
                    {
                        color: '#FA6800',
                        highlight: '#FC8937'
                    },
                    {
                        color: '#4390DF',
                        highlight: '#5C9EE2'
                    },
                    {
                        color: '#C9CF06',
                        highlight: '#DBE200'
                    },
                    {
                        color: '#3462B7',
                        highlight: '#537FD0'
                    },
                    {
                        color: '#D94D92',
                        highlight: '#DC6EA4'
                    },
                    {
                        color: '#BABABA',
                        highlight: '#D0D0D0'
                    }
                ]
            },
            func: {
                init: function () {
                    rwObj.func.createPanel().appendTo(rwObj.obj.$me.empty());
                    rwObj.func.resetData();
                    // call first report generation function
                    rwObj.obj.$rSelected.click();
                },
                createPanel: function () {
                    var $div = $('<div></div').addClass(rwObj.cl.pnl).addClass(rwObj.cl.pnlTheme);
                    rwObj.func.createPanelHead().appendTo($div);
                    rwObj.func.createPanelBody().appendTo($div);
                    rwObj.func.createPanelFoot().appendTo($div);
                    return $div;
                },
                createPanelHead: function () {
                    var $head = $('<div></div>').addClass(rwObj.cl.pnlHead);
                    rwObj.func.createPanelTitle().appendTo($head);
                    return $head;
                },
                createPanelTitle: function () {
                    var $title = $('<div></div>').addClass(rwObj.cl.pnlTitle).html(' ' + options.title);
                    $('<span></span>').addClass(rwObj.cl.icon).addClass(rwObj.cl.reportIcon).prependTo($title);
                    return $title;
                },
                createPanelBody: function () {
                    var $body = $('<div></div>').addClass(rwObj.cl.pnlBody);
                    rwObj.func.createOptionBar().appendTo($body);
                    rwObj.func.createReportNameContainer().appendTo($body);
                    rwObj.func.createGraphContainer().appendTo($body);
                    rwObj.func.createTableContainer().appendTo($body);
                    return $body;
                },
                createPanelFoot: function () {
                    var $foot = $('<div></div>').addClass(rwObj.cl.pnlFoot).addClass(rwObj.cl.pnlFootAlign);
                    rwObj.func.downloadButtons().appendTo($foot);
                    return $foot;
                },
                createOptionBar: function () {
                    var $row = $('<div></div>').addClass('row'),
                    $col1 = $('<div></div>').addClass('col-md-12');
                    rwObj.func.createReportDD().appendTo($col1);
                    rwObj.func.createGraphTypeOption().appendTo($col1);
                    $col1.appendTo($row);
                    return $row;
                },
                createReportDD: function () {
                    var $div = $('<div></div>').addClass('dropdown').addClass('btn-group'), i = 0, v,
                    $btn = $('<button></button>').addClass('btn').addClass('btn-default').addClass('dropdown-toggle').attr({'data-toggle':'dropdown', 'href':'#'}).text(rwObj.msg.selectReport),
                    $ul = $('<ul></ul>').addClass('dropdown-menu'), $a = null;
                    $('<span></span>').addClass('caret').appendTo($btn);
                    $btn.appendTo($div);
                    for (v in options.rName) {
                        $a = $('<a></a>').attr('href','#').data('val', v).text(options.rName[v]).click(function(e) {
                            rwObj.evnt.selectReport(e, this);
                        }).appendTo($('<li></li>').appendTo($ul));
                        if (0 == i) {
                            rwObj.obj.$rSelected = $a;
                        }
                        i++;
                    }
                    if (0 == i) {
                        $('<a></a>').attr('href','#').text(rwObj.msg.noReport).appendTo($('<li></li>').addClass('disabled').appendTo($ul));
                    }
                    $ul.appendTo($div);
                    return $div;
                },
                createGraphTypeOption: function () {
                    var $div = $('<div></div>').addClass(rwObj.cl.rTypeDiv).addClass(rwObj.cl.rTypeSize).addClass('pull-right'), i , ln = rwObj.rType.length, $btn;
                    for (i=0;i<ln;i++) {
                        $btn = $('<button></button>').addClass(rwObj.cl.btn).addClass(rwObj.cl.rTypeBtn).text(rwObj.rType[i]).click(function(e) {
                            rwObj.evnt.selectGraph(e, this);
                        });
                        if (rwObj.dt.gType == rwObj.rType[i]) {
                            $btn.addClass('active');
                        }
                        $btn.appendTo($div);
                    }
                    return $div;
                },
                createReportNameContainer: function () {
                    var $row = $('<div></div>').addClass('row'),
                    $col1 = $('<div></div>').addClass('col-md-12').addClass('text-center');
                    rwObj.obj.$rName = $('<h4></h4>').appendTo($col1);
                    $col1.appendTo($row);
                    return $row;
                },
                createGraphContainer: function () {
                    var $row = $('<div></div>').addClass('row'),
                    $col1 = $('<div></div>').addClass('col-md-12');
                    $col1.appendTo($row);
                    rwObj.obj.$gContainer = $col1;
                    return $row
                },
                createTableContainer: function () {
                    var $row = $('<div></div>').addClass('row'),
                    $col1 = $('<div></div>').addClass('col-md-12');
                    $col1.appendTo($row);
                    rwObj.obj.$tContainer = $col1;
                    return $row
                },
                createGraph: function () {
                    var $row1 = $('<div></div>').addClass('row'),
                    data = options.rData[rwObj.dt.rType], ctx;
                    Chart.defaults.global.responsive = true;
                    Chart.defaults.global.multiTooltipTemplate = '<%= datasetLabel %> - <%= value %>';
                    rwObj.obj.$gContainer.empty();
                    if ('Bar' == rwObj.dt.gType || 'Line' == rwObj.dt.gType || 'Radar' == rwObj.dt.gType) {
                        var $col1 = $('<div></div>').addClass('col-md-12');
                        $('<canvas></canvas>').attr({'id': rwObj.id.chart}).appendTo($('<div></div>').addClass('graph-canvas').appendTo($col1));
                        $col1.appendTo($row1);
                        $row1.appendTo(rwObj.obj.$gContainer);
                        ctx = document.getElementById(rwObj.id.chart).getContext('2d');
                        if ('Bar' == rwObj.dt.gType) {
                            var myNewChart = new Chart(ctx).Bar(data, {
                                maintainAspectRatio: false
                            });
                        }
                        else if ('Line' == rwObj.dt.gType) {
                            var myNewChart = new Chart(ctx).Line(data, {
                                maintainAspectRatio: false
                            });
                        }
                        else if ('Radar' == rwObj.dt.gType) {
                            var myNewChart = new Chart(ctx).Radar(data, {
                                maintainAspectRatio: false
                            });
                        }
                    }
                    else {
                        var i, ln = data.pie.length;
                        for (i = 0; i < ln; i++) {
                            var colSize = 12/ln,
                            $col1 = $('<div></div>').addClass('col-md-' + colSize),
                            $graph = $('<div></div>').addClass('graph-canvas'),
                            $head = $('<h5></h5>').addClass('text-center').attr({'id': 'gh' + i});
                            $('<canvas></canvas>').attr({'id': rwObj.id.chart + i}).appendTo($graph);
                            $graph.appendTo($col1);
                            $head.appendTo($col1);
                            $col1.appendTo($row1);
                            $row1.appendTo(rwObj.obj.$gContainer);
                        }
                        if ('Polar' == rwObj.dt.gType) {
                            for (i = 0; i < ln; i++) {
                                ctx = document.getElementById(rwObj.id.chart + i).getContext('2d');
                                var myNewChart = new Chart(ctx).PolarArea(data['pie'][i]['data'], {
                                    maintainAspectRatio: false
                                });
                                $('#gh' + i).text(data['pie'][i]['label']);
                            }
                        }
                        else if ('Pie' == rwObj.dt.gType) {
                            for (i = 0; i < ln; i++) {
                                ctx = document.getElementById(rwObj.id.chart + i).getContext('2d');
                                var myNewChart = new Chart(ctx).Pie(data['pie'][i]['data'], {
                                    maintainAspectRatio: false
                                });
                                $('#gh' + i).text(data['pie'][i]['label']);
                            }
                        }
                        else if ('Doughnut' == rwObj.dt.gType) {
                            for (i = 0; i < ln; i++) {
                                ctx = document.getElementById(rwObj.id.chart + i).getContext('2d');
                                var myNewChart = new Chart(ctx).Doughnut(data['pie'][i]['data'], {
                                    maintainAspectRatio: false
                                });
                                $('#gh' + i).text(data['pie'][i]['label']);
                            }
                        }
                    }
                },
                createTable: function () {
                    var $table = $('<table></table>').addClass('table dtable'), data = options.rData[rwObj.dt.rType],
                    $thead = $('<thead></thead>'), $tbody = $('<tbody></tbody>'), $tr = $('<tr></tr>'), i, ln, j,
                    labelLn = data.labels.length;

                    // header
                    $('<th><span class=\'glyphicon glyphicon-paperclip pin\'></span></th>').appendTo($tr);
                    for (i = 0; i < labelLn; i++) {
                        $('<th></th>').text(data.labels[i]).appendTo($tr);
                    }
                    $tr.appendTo($thead);
                    $thead.appendTo($table);

                    // body
                    for (i = 0, ln = data.datasets.length; i < ln; i++) {
                        $tr = $('<tr></tr>');
                        $('<td></td>').text(data.datasets[i].label).appendTo($tr);
                        for (j = 0; j < labelLn; j++) {
                            $('<td></td>').text(data.datasets[i].data[j]).appendTo($tr);
                        }
                        $tr.appendTo($tbody);
                    }
                    $tbody.appendTo($table);
                    $table.appendTo(rwObj.obj.$tContainer.empty());
                },
                selectReport: function ($me) {
                    var $div = $me.parent().parent().parent(), $btn = $div.find('button');
                    $btn.html($me.text() + ' <span class=\'caret\'></span>');
                    rwObj.obj.$rName.text($me.text());
                    $div.removeClass('open');
                    rwObj.func.createGraph();
                    rwObj.func.createTable();
                },
                selectGraph: function ($me) {
                    $me.parent().find('button.active').removeClass('active');
                    $me.addClass('active');
                    rwObj.func.createGraph();
                },
                downloadButtons: function () {
                    var $div = $('<div></div>').addClass(rwObj.cl.dwnBtnDiv).addClass(rwObj.cl.dwnBtnSize);
                    $('<button></button>').addClass(rwObj.cl.btn).addClass(rwObj.cl.dwnBtnPdf).text('Pdf').click(function() {
                        rwObj.evnt.downloadPdf();
                    }).appendTo($div);
                    $('<button></button>').addClass(rwObj.cl.btn).addClass(rwObj.cl.dwnBtnCsv).text('Csv').click(function() {
                        rwObj.evnt.downloadCsv();
                    }).appendTo($div);
                    $('<button></button>').addClass(rwObj.cl.btn).addClass(rwObj.cl.dwnBtnPrint).text('Print').click(function() {
                        rwObj.evnt.downloadPrint();
                    }).appendTo($div);
                    return $div;
                },
                downloadCsv: function () {
                    var csvData = [], data = options.rData[rwObj.dt.rType], i, ln, j, labelLn = data.labels.length, dt;

                    // header
                    dt = ['']
                    for (i = 0; i < labelLn; i++) {
                        dt[dt.length] = data.labels[i];
                    }
                    csvData[csvData.length] = dt;

                    // body
                    for (i = 0, ln = data.datasets.length; i < ln; i++) {
                        dt = [data.datasets[i].label];
                        for (j = 0; j < labelLn; j++) {
                            dt[dt.length] = data.datasets[i].data[j];
                        }
                        csvData[csvData.length] = dt;
                    }

                    var csvRows = [];
                    for(var i=0,l=csvData.length; i<l; ++i){
                        csvRows.push(csvData[i].join(','));   // unquoted CSV row
                    }
                    var csvString = csvRows.join("\r\n");

                    var a = document.createElement('a');
                    a.href     = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csvString);
                    a.target   = '_blank';
                    a.download = 'myFile.csv';
                    document.body.appendChild(a);
                    a.click();
                },
                downloadPdf: function () {
                    var doc = new jsPDF('p','pt','a4'), $pBody = $('.panel-body');

                    // patch for firefox
                    $pBody.css('height', $pBody.height() + 'px');
                    doc.addHTML(rwObj.obj.$me.get(0), 0, 10,function(){
                        doc.save('report.pdf');
                        // undo patch for firefox
                        $pBody.css('height', 'auto');
                    });
                },
                resetData: function () {
                    var barColLn = rwObj.color.bar.length,
                    pieColLn = rwObj.color.pie.length, dt, bi, pi;
                    for (dt in options.rData) {
                        var pie = [];
                        bi = 0;
                        for (var i = 0, ln = options.rData[dt].datasets.length; i < ln; i++) {
                            var pData = {}, data = [];
                            bi = (bi >= barColLn - 1 && 1 || bi+2) - 1;
                            options.rData[dt].datasets[i] = jQuery.extend({}, rwObj.color.bar[bi],options.rData[dt].datasets[i]);
                            pi = 0;
                            for (var j = 0, jln = options.rData[dt].labels.length; j < jln; j++) {
                                data[data.length] = jQuery.extend({
                                    label: options.rData[dt].labels[j],
                                    value: options.rData[dt].datasets[i]['data'][j]
                                }, rwObj.color.pie[pi]);
                                pi = (pi >= pieColLn - 1 && 1 || pi+2) - 1;
                            }
                            pData['label'] = options.rData[dt].datasets[i]['label'];
                            pData['data'] = data;
                            pie[pie.length] = pData;
                        }
                        options.rData[dt]['pie'] = pie;
                    }
                }
            },
            evnt: {
                downloadPdf: function () {
                    rwObj.func.downloadPdf();
                },
                downloadCsv: function () {
                    rwObj.func.downloadCsv();
                },
                downloadPrint: function () {
                    window.print();
                },
                selectReport: function (e, me) {
                    e.preventDefault();
                    var $me = $(me);
                    rwObj.dt.rType = $me.data('val');
                    rwObj.func.selectReport($me);
                    return false;
                },
                selectGraph: function (e, me) {
                    var $me = $(me);
                    rwObj.dt.gType = $me.text();
                    rwObj.func.selectGraph($me);
                }
            }
        };
        // calling main function
        rwObj.func.init();
    };
})(jQuery);