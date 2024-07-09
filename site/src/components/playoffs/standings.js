import React, { useRef, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import * as d3 from 'd3';
import { TableContainer } from '@mui/material';
import Paper from '@mui/material/Paper';


const Standings = ({ playoffData }) => {
    const svgRef = useRef();
    const [treeDimensions, setTreeDimensions] = useState({ width: 800, height: 600 });

    // Bracket dimensions and layout
    const width = 800;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const bracketWidth = width - margin.left - margin.right;
    const bracketHeight = height - margin.top - margin.bottom;
    const gameWidth = bracketWidth / 8; // 7 games + 1 space


    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const treeLayout = d3.tree().nodeSize([100, 200]);

        const root = d3.hierarchy(playoffData);

        treeLayout(root);

        const svgWidth = root.height * 500; // Adjust this multiplier based on your tree's dimensions
        const svgHeight = root.descendants().length * 500; // Adjust this multiplier based on your tree's dimensions
        setTreeDimensions({ width: svgWidth, height: svgHeight });

        const g = svg.append("g").attr("transform", `translate(734, 70)`);

        const link = g.selectAll(".link")
            .data(root.links())
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d => `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`)
            .attr("stroke", "black")
            .attr("stroke-width", 1);

        const node = g.selectAll(".node")
            .data(root.descendants())
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        node.append("rect")
            .attr("x", -50)
            .attr("y", -10)
            .attr("width", 100)
            .attr("height", 60)
            .attr("fill", "lightblue")
            .attr("stroke", "black");

        node.append("text")
            .attr("dy", "1em")
            .attr("x", 0)
            .attr("y", 5)
            .style("text-anchor", "middle")
            .text(d => d.data.name);

    }, [playoffData]);

    return (
        <>
            <TableContainer component={Paper}>
                <h1 style={{ textAlign: 'start', paddingLeft: '1rem' }}>Playoff Bracket</h1>
                <Container style={{ justifyContent: 'center', display: 'auto' }}>
                    <svg ref={svgRef} width='100%' height='100%' viewBox={`0 0 ${treeDimensions.width} ${treeDimensions.height}`}></svg>  
                </Container> 
            </TableContainer>

        </>
    );
};

export default Standings;


