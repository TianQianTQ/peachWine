/**
 * 表格数据格式
 * header(表头)：index(data对应的字段) text(表头显示文字) width(列宽) style(自定义样式)
 * data(表格内容): 字段与header里的index字段一一对应
 */
export const functionAttributes = {
    'header': [
      {
        'index': 'name0',
        'text': '参数',
        'width': '',
        'style': ''
      },
      {
        'index': 'name1',
        'text': '说明',
        'width': '',
        'style': ''
      },
      {
        'index': 'name2',
        'text': '类型',
        'width': '',
        'style': ''
      },
      {
        'index': 'name3',
        'text': '默认值',
        'width': '',
        'style': ''
      },
      {
        'index': 'name4',
        'text': '选项',
        'width': '',
        'style': ''
      }
    ],
    'data': [
      {
        'name0': 'elementId',
        'name1': '放置图形的标签Id',
        'name2': 'string',
        'name3': '—',
        'name4': '必填项'
      },
      {
        'name0': 'value',
        'name1': '显示的数字',
        'name2': 'number',
        'name3': '—',
        'name4': '必填项'
      },
      {
        'name0': 'options',
        'name1': '可配置项',
        'name2': 'object',
        'name3': '—',
        'name4': '可填项'
      },
      {
        'name0': 'isUpdate',
        'name1': '是否可以点击图形改变显示的数字',
        'name2': 'boolean',
        'name3': 'true',
        'name4': '可填项'
      }
    ]
  }
  export const attributes = {
    'header': [
      {
        'index': 'name0',
        'text': '参数',
        'width': '',
        'style': ''
      },
      {
        'index': 'name1',
        'text': '说明',
        'width': '',
        'style': ''
      },
      {
        'index': 'name2',
        'text': '类型',
        'width': '',
        'style': ''
      },
      {
        'index': 'name3',
        'text': '默认值',
        'width': '',
        'style': ''
      }
    ],
    'data': [
      {
        'name0': 'minValue',
        'name1': '最小值',
        'name2': 'number',
        'name3': '0'
      },
      {
        'name0': 'maxValue',
        'name1': '最大值',
        'name2': 'number',
        'name3': '100'
      },
      {
        'name0': 'circleThickness',
        'name1': '外圆厚度占其半径的百分比',
        'name2': 'number',
        'name3': '0.05'
      },
      {
        'name0': 'circleFillGap',
        'name1': '外圆和波圆之间的间隙的大小占外圆半径的百分比',
        'name2': 'number',
        'name3': '0.05'
      },
      {
        'name0': 'circleColor',
        'name1': '外圈的颜色',
        'name2': 'Hex(十六进制颜色码)',
        'name3': '#178BCA'
      },
      {
        'name0': 'waveHeight',
        'name1': '波高作为波浪圆半径的百分比。',
        'name2': 'number',
        'name3': '0.05'
      },
      {
        'name0': 'waveCount',
        'name1': '波浪每圈宽度的全波数',
        'name2': 'number',
        'name3': '1'
      },
      {
        'name0': 'waveRiseTime',
        'name1': '波浪从0上升到最终高度的时间量（以毫秒为单位）',
        'name2': 'number',
        'name3': '1000'
      },
      {
        'name0': 'waveAnimateTime',
        'name1': '全波进入波浪圈的时间量（以毫秒为单位）',
        'name2': 'number',
        'name3': '18000'
      },
      {
        'name0': 'waveRise',
        'name1': '控制波浪应该从0上升到它的全高，还是从它的全高开始',
        'name2': 'boolean',
        'name3': 'true'
      },
      {
        'name0': 'waveHeightScaling',
        'name1': '控制低填充百分比和高填充百分比时的波浪尺寸缩放。 如果为真，波浪高度在50％填充时达到最大值，最小值在0％和100％填充时达到最大值。 这有助于防止波浪在接近最小或最大填充时使波浪圈显得完全填满或空白',
        'name2': 'boolean',
        'name3': 'true'
      },
      {
        'name0': 'waveAnimate',
        'name1': '控制波浪是滚动还是静止',
        'name2': 'boolean',
        'name3': 'true'
      },
      {
        'name0': 'waveColor',
        'name1': '填充波的颜色',
        'name2': 'Hex(十六进制颜色码)',
        'name3': '#178BCA'
      },
      {
        'name0': 'waveOffset',
        'name1': '最初抵消波浪的数量。 0 =没有偏移。 1 =一个完整波的偏移',
        'name2': 'number',
        'name3': '0'
      },
      {
        'name0': 'textVertPosition',
        'name1': '在波形圆圈中显示百分比文本的高度。 0 =底部，1 =顶部',
        'name2': 'number',
        'name3': '0.5'
      },
      {
        'name0': 'textSize',
        'name1': '要在波形圆中显示的文本的相对高度。 1 = 50％',
        'name2': 'number',
        'name3': '1'
      },
      {
        'name0': 'valueCountUp',
        'name1': '如果为true，则显示的值在加载时从0计数到它的最终值。 如果为false，则显示最终值。',
        'name2': 'boolean',
        'name3': 'true'
      },
      {
        'name0': 'displayPercent',
        'name1': ' 如果为true，则在值之后显示％符号',
        'name2': 'boolean',
        'name3': 'true'
      },
      {
        'name0': 'textColor',
        'name1': '波形不重叠时的值文本的颜色',
        'name2': 'Hex(十六进制颜色码)',
        'name3': '#045681'
      },
      {
        'name0': 'waveTextColor',
        'name1': '波形重叠时值文本的颜色',
        'name2': 'Hex(十六进制颜色码)',
        'name3': '#A4DBf8'
      }
    ]
  }
