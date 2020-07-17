import {Component} from "@angular/core";
import {SubletService} from "../../services/sublet.service";
import * as d3 from 'd3';
import {ApartmentService} from "../../services/apartment.service";

@Component({
  selector: 'graphs',
  templateUrl: './graphs.component.html',
  providers: [SubletService],
  styleUrls: []
})

export class GraphsComponent {
  data = {};
  dataArray: {city: string, sublets:number}[] = [];
  secondGraphData = {};
  secondGraphDataArray: {numOfRooms: number, amountOfSublets: number}[] = [];

  // set the dimensions and margins of the graph
  margin = { top: 70, right: 30, bottom: 70, left: 60 };
  width = 500 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  // append the svg object to the body of the page
  svg;

  constructor(private subletService: SubletService, private apartmentService: ApartmentService) {
    this.subletService.getSublets()
      .subscribe(sublets => {
        this.subletService.groupBySublet().subscribe(data => {
          const subletsDict = {}
          data.forEach(sublet => {
            subletsDict[sublet._id] = sublet;
          });
          console.log(data)
          for(let i = 0;i < data.length;i++){
            console.log(data[i])
            this.dataArray.push({city: data[i]._id, sublets: data[i].count})
          }

          //this.apartmentService.mapReduceApartments().subscribe(data => {})
          this.svg = d3.select("#firstGraph")
            .append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform",
              "translate(" + this.margin.left + "," + this.margin.top + ")");
          // X axis
          const x = d3.scaleBand()
            .range([0, this.width])
            .domain(this.dataArray.map(function (d) { return d.city; }))
            .padding(0.2);
          this.svg.append("g")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-22)")
            .style("text-anchor", "end");
// Add Y axis
          const y = d3.scaleLinear()
            .domain([0, 100])
            .range([this.height, 0]);
          this.svg.append("g")
            .call(d3.axisLeft(y));
          const self =  this;
// Bars
          this.svg.selectAll("mybar")
            .data(this.dataArray)
            .enter()
            .append("rect")
            .attr("x", function (d) { return x(d.city); })
            .attr("y", function (d) { return y(d.sublets); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return self.height - y(d.sublets); })
            .attr("fill", "#9de9de")
//add x-axis label
          this.svg.append("text")
            .attr("transform", "translate(" + (this.width / 2) + " ," + (this.height + this.margin.bottom - 15) + ")")
            .style("text-anchor", "middle")
            .text("City");
//add y-axis label
          this.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.margin.left)
            .attr("x", 0 - (this.height / 2))
            .attr("dy", "2em")
            .style("font-size", "12px")
            .style("text-anchor", "middle")
            .text("Amount Of Sublets");
// add title to the graph
          this.svg.append("text")
            .attr("x", (this.width / 2))
            .attr("y", 0 - (this.margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Amount Of Sublets Per City");

          // set the dimensions and margins of the graph
          const margin2 = { top: 70, right: 30, bottom: 70, left: 60 },
            width = 500 - margin2.left - margin2.right,
            height = 500 - margin2.top - margin2.bottom;
          // append the svg object to the body of the page
          const svg2 = d3.select("#secondGraph")
            .append("svg")
            .attr("width", width + margin2.left + margin2.right)
            .attr("height", height + margin2.top + margin2.bottom)
            .append("g")
            .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
          // Add X axis
          const x2 = d3.scaleLinear()
            .domain([0, 10])
            .range([0, width]);
          svg2.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x2))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");
          // Y axis
          var y2 = d3.scaleBand()
            .domain(this.secondGraphDataArray.map(function (d) { return d.numOfRooms; }))
            .range([0, height])
            .padding(1);
          svg2.append("g")
            .call(d3.axisLeft(y2));
          //lines
          svg2.selectAll("myline")
            .data(this.secondGraphDataArray)
            .enter()
            .append("line")
            .attr("x1", function (d) { return x2(d.amountOfSublets); })
            .attr("x2", x2(0))
            .attr("y1", function (d) { return y2(d.numOfRooms); })
            .attr("y2", function (d) { return y2(d.numOfRooms); })
            .attr("stroke", "black")
          // Circles
          svg2.selectAll("mycircle")
            .data(this.secondGraphDataArray)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x2(d.amountOfSublets); })
            .attr("cy", function (d) { return y2(d.numOfRooms); })
            .attr("r", "6")
            .style("fill", "#9de9de")
            .attr("stroke", "black")
          //add y-axis label
          svg2.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin2.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "2em")
            .style("font-size", "12px")
            .style("text-anchor", "middle")
            .text("Number Of Rooms");
          // add x-axis label
          svg2.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + this.margin.bottom - 15) + ")")
            .style("text-anchor", "middle")
            .text("Amount Of Sublets");
          // add title to the graph
          svg2.append("text")
            .attr("x", (width / 2))
            .attr("y", 0 - (this.margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text("Amount Of Sublets By Number Of Rooms");

        });
      })
  }

}


