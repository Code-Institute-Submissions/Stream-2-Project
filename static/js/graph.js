
    queue()
       .defer(d3.json,"/data")
       .await(makeGraphs);
       
    function makeGraphs(error,menuData) {
        
        var ndx = crossfilter(menuData);
        
        var catColors = d3.scale.ordinal()
            .domain(["Breakfast", "Beef & Pork", "Chicken & Fish", "Salads", "Snacks & Sides", "Desserts", "Beverages", "Coffee & Tea", "Smoothies & Shakes"])
            .range(["blue", "red", "purple", "yellow", "green", "black", "pink", "orange", "gray"])
        
        var CategoryDim = ndx.dimension(dc.pluck("Category"));
        var CategorySelect = CategoryDim.group();
    
        dc.selectMenu("#mcdonald-selector")
            .dimension(CategoryDim)
            .group(CategorySelect);
        
        
        
        
        var itemDim = ndx.dimension(dc.pluck('Item'));
        var caloriesGroup = itemDim.group().reduceSum(dc.pluck('Calories'));

        var caloriesRowChart = dc.rowChart("#calories-row");
        caloriesRowChart
            .width(600)
            .height(330)
            .dimension(itemDim)
            .group(caloriesGroup)
            .cap(10)
            .othersGrouper(false)
            .xAxis().ticks(4)
            // .colors(catColors);
            


        menuData.forEach(function(d) {
              d.TotalFat = parseFloat(d.TotalFat);
              if (isNaN(d.TotalFat)) {
                  d.TotalFat = 0;
              }
        });

         
         
         function add_item2(p, v) {
              p.count++;
              p.total += v.TotalFat;
              p.average = p.total / p.count;
              return p;
          }
   
        function remove_item2(p, v) {
              p.count--;
              if(p.count == 0) {
                  p.total = 0;
                  p.average = 0;
              }else {
                  p.total -= v.TotalFat;
                  p.average = p.total / p.count;
              }
              return p;
          }
          
        function init() {
              return {count:0, total:0, average:0};
          }
           
            
        
        var avg_TotalFat = CategoryDim.group().reduce(add_item2, remove_item2, init);
        // var color = d3.scale.ordinal()
        //       .domain(["Beef & Pork", "Beverages", "Breakfast","Chicken & Fish","Coffee & Tea","Desserts","Salads","Smoothies &Shakes","Snacks & Sides"])
        //       .range(["#fff","#000","#333","#fff","#000","#333","#fff","#000","#333"]);

   
        dc.barChart("#chart1")
            .width(600)
            .height(350)
            // .colorScales = d3.scale.ordinal()
            //   .domain(["Beef & Pork", "Beverages", "Breakfast","Chicken & Fish","Coffee & Tea","Desserts","Salads","Smoothies &Shakes","Snacks & Sides"])
            //   .range(["#fff","#000","#333","#fff","#000","#333","#fff","#000","#333"])

            .margins({top:30, right:50, bottom:80, left:50})
            .dimension(CategoryDim)
            .group(avg_TotalFat)
            .valueAccessor(function(d){
                return d.value.average;
            })
            .transitionDuration(500)
            .x(d3.scale.ordinal())
            .xUnits(dc.units.ordinal)
            .xAxisLabel("Category")
            .yAxisLabel("Avg.TotalFat")
            .yAxis().ticks(4)
            // .colors(catColors);
            
            
        var veggie_dim = ndx.dimension(dc.pluck('veg'));
        
        var veggie_total = veggie_dim.group()
        
        dc.pieChart('#chart2')
            .height(400)
            .radius(200)
            .transitionDuration(1500)
            .dimension(veggie_dim)
            .group(veggie_total);
  
  
  
    //   var genderColors = d3.scale.ordinal()
    //     .domain(["Female", "Male"])
    //     .range(["pink", "blue"]);
        
        
 
        
        var servingSizeDim = ndx.dimension(function(d){
            return [d.Calories, d.ServingSizePerGram, d.Item, d.Category];
        });
        
        var ssGroup = servingSizeDim.group();
        
        var calScatter = dc.seriesChart("#calory-ss-scatter")
        

        
        var subChart = function(c) {
            return dc.scatterPlot(c)
                .symbolSize(8)
                .highlightedSize(10)
                
        }
        
        calScatter
            .width(800)
            .height(400)
            .chart(subChart)
            .x(d3.scale.linear().domain([0, 2000]))
            .y(d3.scale.linear().domain([0, 1000]))
            .brushOn(false)
            // .symbolSize(8)
            .clipPadding(10)
            .yAxisLabel("Serving Size")
            .xAxisLabel("Calories")
            .seriesAccessor(function(d){
                return d.key[3];
            })
            .keyAccessor(function(d){
                return d.key[0];
            })
            .valueAccessor(function(d){
                return d.key[1];
            })
            .colorAccessor(function (d) {
                return d.key[3];
            })
            
            .title(function (d) {
                return d.key[1] + "g serving of " + d.key[2] + " has " + d.key[0] + "cal" ;
            })

            .legend(dc.legend().x(700).y(10).itemHeight(10).gap(10))

            .colors(catColors)
            .dimension(servingSizeDim)
            .group(ssGroup)
            .margins({top: 10, right: 100, bottom: 75, left: 75})
            .yAxis().ticks(10);
            
            
        
        
        
    
        dc.renderAll();
        
    }
    
