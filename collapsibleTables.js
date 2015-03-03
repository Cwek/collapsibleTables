/**
 * Collapsible tables
 *
 * 改动自//zh.wikipedia.org/w/index.php?title=MediaWiki:Gadget-ct.js&oldid=29207188
 * 算是还原了就有使用collapsible类的表格吧……
 */
 
( function ( window, document, $, undefined ) { 
var ct={};
window.collapsibleTables=ct;
 
ct.autoCollapse = 2;
ct.collapseCaption = wgULS('隐藏▲', '隱藏▲');
ct.expandCaption = wgULS('显示▼', '顯示▼');
 
ct.collapsed="collapsed";
ct.uncollapsed="uncollapsed";
ct.Button="collapseButton";
ct.Table="collapsibleTable";
ct.Row="collapsibleTableRow";
ct.Header="collapsibleTableHeader";
 
ct.collapseTable=function(tableIndex) 
{
    var Table=$("table#" + ct.Table + tableIndex);
    var Button=Table.find('a.' + ct.Button + tableIndex).first();
 
    if ( !Table || !Button ) {
        return false;
    }
 
    var Rows=Table.children("tbody").children("tr");
    var FirstRow=Table.find("tr." + ct.Row + tableIndex).first();
 
    //console.log("click");
    if(Table.hasClass(ct.uncollapsed))
    {
        Rows.each(function()
        {
            if($(this).hasClass(ct.Row + tableIndex))
            {
                return;
            }
            else
            {
                $(this).css("display","none");
            }
            //console.log("close");
        });
        Button.text(ct.expandCaption);  
        Table.removeClass(ct.uncollapsed).addClass(ct.collapsed);
    }
    else
    {
        Rows.each(function()
        {
            if($(this).hasClass(ct.Row + tableIndex))
            {
                return;
            }
            else
            {
                $(this).css("display",FirstRow.css("display"));
            }
        });
        Button.text(ct.collapseCaption);
        Table.addClass(ct.uncollapsed).removeClass(ct.collapsed);
        //console.log("open");
    }
    //console.log("done");
}
 
ct.createClickHandler=function(tableIndex)
{
    return function(e)
    {
        var target = $(e.target);
        var a=target.is("th."+ct.Header + tableIndex);//是指定<th>本身？
        var b=target.parents().is("th."+ct.Header + tableIndex);//本身是指定<th>子代？
        var c=target.is("a."+ ct.Button + tableIndex);//本身是指定<a>？
        var d=(target.is("a")&&!c)||(target.parents("a").is("a")&&!target.parents("a").is("a."+ ct.Button + tableIndex));//本身或其父代是<a>但不是指定<a>？
        console.log(target);
        console.log("a,b,c,d=>",a,b,c,d);
        if(b&&d)//是指定<th>的子代<a>但不是指定<a>
        {}
        else//否则
        {
            if(a||b)//针对td符合的click触发，判断是否th本身或th的子代（部分th包含其他非纯文字节点，点击时是其th子代触发，th只包含纯文字节点，点击时是th本身触发）
            {
                ct.collapseTable(tableIndex);
                if(c)
                {
                    return false;//防止子元素（<a>与父代<td>）事件冒泡        
                }
            }  
        }
    }
}
 
ct.createCollapseButtons=function() {
    var tableIndex = 0;
    var NavigationBoxes = new Array();
    var Tables=$("table.collapsible");
 
    Tables.each(function(){
        var Table=$(this);
        var HeaderRow=Table.find("tr").first();
        if ( !HeaderRow ) {
            return;//用于跳过each()
        }
        var Header=HeaderRow.children("th").first();
        if ( !Header ) {
            return;//用于跳过each()
        }
 
        NavigationBoxes[tableIndex] = $(this);
 
        Table.attr("id",ct.Table + tableIndex );
        Table.addClass(ct.uncollapsed);
        HeaderRow.addClass(ct.Row + tableIndex);
        Header.addClass(ct.Header + tableIndex);
 
        //console.log("mark table and header as "+tableIndex);
        var button=$("<span>");
        var buttonlink=$("<a>");
 
        button
            .css("float","right")
            .css("font-weight","normal")
            .css("text-align","right")
            .css("width","8em");
 
        buttonlink.attr("href","#");
        buttonlink.css("color",Header.css("color"));
        buttonlink.addClass(ct.Button + tableIndex);
        buttonlink.text(ct.collapseCaption);
 
        Header.css("cursor","Pointer") ;
 
        button.append(buttonlink);
        Header.prepend(button);       
 
        //console.log("set header on "+tableIndex);
        var clickhandler=ct.createClickHandler(tableIndex);
        $("th." + ct.Header + tableIndex+","+"a." + ct.Button + tableIndex )
            .bind("click",clickhandler);
 
        tableIndex++;
    });
 
    for ( var i = 0; i < tableIndex; i++ ) {
        if ( NavigationBoxes[i].hasClass(ct.collapsed) ||
            ( tableIndex >= ct.autoCollapse &&  NavigationBoxes[i].hasClass( 'autocollapse' ) )
        ) {
            ct.collapseTable( i );
        }
    }
}
 
$( ct.createCollapseButtons );
} ( window, document, jQuery ));