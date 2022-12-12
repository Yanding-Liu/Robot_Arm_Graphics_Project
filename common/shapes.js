const cone_pos = (roundness) => {
    const poly = [];
    for (let i = 0; i < roundness; i++) {
        let i2 = (i+1)%roundness;
        let x1 = Math.cos(i*Math.PI*2/roundness) * 0.5;
        let z1 = Math.sin(i*Math.PI*2/roundness) * 0.5;
        let x2 = Math.cos(i2*Math.PI*2/roundness) * 0.5;
        let z2 = Math.sin(i2*Math.PI*2/roundness) * 0.5;
        // base
        poly.push([0.0, 0.0, 0.0, 1.0]);
        poly.push([x1 , 0.0, z1 , 1.0]);
        poly.push([x2 , 0.0, z2 , 1.0]);
        // side
        poly.push([0.0, 0.8, 0.0, 1.0]);
        poly.push([x2 , 0.0, z2 , 1.0]);
        poly.push([x1 , 0.0, z1 , 1.0]);
    }
    return poly;
}
const cylin_pos = (roundness) => {
    const poly = [];
    const x_cor = [];
    const z_cor = [];
    for (let i = 0; i < roundness; i++) {
        x_cor.push(Math.cos(i*Math.PI*2/roundness));
        z_cor.push(Math.sin(i*Math.PI*2/roundness));
    }
    // base
    for (let i = 0; i < roundness; i++) {
        let i2 = (i+1)%roundness;

        // base
        poly.push([0.0, -0.5, 0.0, 1.0]);
        poly.push([x_cor[i], -0.5, z_cor[i], 1.0]);
        poly.push([x_cor[i2], -0.5, z_cor[i2], 1.0]);

        // top
        poly.push([0.0, 0.5, 0.0, 1.0]);
        poly.push([x_cor[i2], 0.5, z_cor[i2], 1.0]);
        poly.push([x_cor[i], 0.5, z_cor[i], 1.0]);

        // sides
        poly.push([x_cor[i], -0.5, z_cor[i], 1.0]);
        poly.push([x_cor[i], 0.5, z_cor[i], 1.0]);
        poly.push([x_cor[i2], 0.5, z_cor[i2], 1.0]);

        poly.push([x_cor[i], -0.5, z_cor[i], 1.0]);
        poly.push([x_cor[i2], 0.5, z_cor[i2], 1.0]);
        poly.push([x_cor[i2], -0.5, z_cor[i2], 1.0]);
    }
    return poly;
}
const cube_pos = () => [
    // front (z > 0)
    [-0.5, -0.5, 0.5, 1.0], [0.5, 0.5, 0.5, 1.0], [-0.5, 0.5, 0.5, 1.0], 
    [-0.5, -0.5, 0.5, 1.0], [0.5, -0.5, 0.5, 1.0], [0.5, 0.5, 0.5, 1.0], 
    // back (z < 0)
    [-0.5, -0.5, -0.5, 1.0], [-0.5, 0.5, -0.5, 1.0], [0.5, 0.5, -0.5, 1.0], 
    [-0.5, -0.5, -0.5, 1.0], [0.5, 0.5, -0.5, 1.0], [0.5, -0.5, -0.5, 1.0], 
    // right (x > 0)
    [0.5, -0.5, -0.5, 1.0], [0.5, 0.5, -0.5, 1.0], [0.5, 0.5, 0.5, 1.0], 
    [0.5, -0.5, -0.5, 1.0], [0.5, 0.5, 0.5, 1.0], [0.5, -0.5, 0.5, 1.0],  
    // left (x < 0)
    [-0.5, -0.5, -0.5, 1.0], [-0.5, 0.5, 0.5, 1.0], [-0.5, 0.5, -0.5, 1.0], 
    [-0.5, -0.5, -0.5, 1.0], [-0.5, -0.5, 0.5, 1.0], [-0.5, 0.5, 0.5, 1.0],  
    // top (y > 0)
    [-0.5, 0.5, 0.5, 1.0], [0.5, 0.5, -0.5, 1.0], [-0.5, 0.5, -0.5, 1.0], 
    [-0.5, 0.5, 0.5, 1.0], [0.5, 0.5, 0.5, 1.0], [0.5, 0.5, -0.5, 1.0], 
    // bottom (y < 0)
    [-0.5, -0.5, 0.5, 1.0], [-0.5, -0.5, -0.5, 1.0], [0.5, -0.5, -0.5, 1.0], 
    [-0.5, -0.5, 0.5, 1.0], [0.5, -0.5, -0.5, 1.0], [0.5, -0.5, 0.5, 1.0], 
];

const sphere_pos = (roundness) => { // num of triangles for for 360 degree
    const poly = [];
    const unit_ang = Math.PI*2/roundness; 
    const radius = 0.5;

    // each laogitude slice
    for (let i = 0; i < roundness; i++) {
        const phi1 = i * unit_ang;
        const phi2 = ((i+1)%(roundness)) * unit_ang;
        
        for (let j = 0; j < Math.round(roundness/4); j++) {
            const theta1 = j * unit_ang;
            const theta2 = (j+1) * unit_ang;

            const x1_left  = radius * Math.sin(theta1) * Math.cos(phi1);
            const z1_left  = radius * Math.sin(theta1) * Math.sin(phi1);
            const x1_right = radius * Math.sin(theta1) * Math.cos(phi2);
            const z1_right = radius * Math.sin(theta1) * Math.sin(phi2);
            const y1 = radius * Math.cos(theta1);

            const x2_left  = radius * Math.sin(theta2) * Math.cos(phi1);
            const z2_left  = radius * Math.sin(theta2) * Math.sin(phi1);
            const x2_right = radius * Math.sin(theta2) * Math.cos(phi2);
            const z2_right = radius * Math.sin(theta2) * Math.sin(phi2);
            const y2 = radius * Math.cos(theta2);

            // each top rectangle chunk
            if (j != 0) {
                // if not the top triangle
                poly.push([x1_left , y1, z1_left , 1.0]);
                poly.push([x1_right, y1, z1_right, 1.0]);
                poly.push([x2_right, y2, z2_right, 1.0]);
            }
            poly.push([x1_left , y1, z1_left , 1.0]);
            poly.push([x2_right, y2, z2_right, 1.0]);
            poly.push([x2_left , y2, z2_left , 1.0]);

            // each bottom rectangle chunk
            if (j != 0) {
                // if not the top triangle
                poly.push([x1_left , -y1, z1_left , 1.0]);
                poly.push([x2_right, -y2, z2_right, 1.0]);
                poly.push([x1_right, -y1, z1_right, 1.0]);
            }
            poly.push([x1_left , -y1, z1_left , 1.0]);
            poly.push([x2_left , -y2, z2_left , 1.0]);
            poly.push([x2_right, -y2, z2_right, 1.0]);
        }
    }
    return poly;
};

const torus_pos = (roundness) => {
    const poly = [];
    const unit_ang = Math.PI*2/roundness; 
    const bigR = 0.4;
    const smallr = 0.1;
    for (let i = 0; i < roundness; i++) {
        const phi1 = i * unit_ang;
        const phi2 = ((i+1)%(roundness)) * unit_ang;
        for (let j = 0; j < roundness; j++) {
            const theta1 = j * unit_ang;
            const theta2 = (j+1) * unit_ang;

            const x1_left  = (bigR + smallr * Math.sin(theta1)) * Math.cos(phi1);
            const z1_left  = (bigR + smallr * Math.sin(theta1)) * Math.sin(phi1);
            const x1_right = (bigR + smallr * Math.sin(theta1)) * Math.cos(phi2);
            const z1_right = (bigR + smallr * Math.sin(theta1)) * Math.sin(phi2);
            const y1 = smallr * Math.cos(theta1);

            const x2_left  = (bigR + smallr * Math.sin(theta2)) * Math.cos(phi1);
            const z2_left  = (bigR + smallr * Math.sin(theta2)) * Math.sin(phi1);
            const x2_right = (bigR + smallr * Math.sin(theta2)) * Math.cos(phi2);
            const z2_right = (bigR + smallr * Math.sin(theta2)) * Math.sin(phi2);
            const y2 = smallr * Math.cos(theta2);

            poly.push([x1_left , y1, z1_left , 1.0]);
            poly.push([x1_right, y1, z1_right, 1.0]);
            poly.push([x2_right, y2, z2_right, 1.0]);
            poly.push([x1_left , y1, z1_left , 1.0]);
            poly.push([x2_right, y2, z2_right, 1.0]);
            poly.push([x2_left , y2, z2_left , 1.0]);
        }
    }
    return poly;
}; 

const cube_colors = (num) => {
    const colors = [];
    let R0 = Math.random();
    let G0 = Math.random();
    let B0 = Math.random();
    for (let i = 0; i < num*36; i++) {
        colors.push([R0, G0, B0, 1.0]);
    }
    return colors;
}
const plate_colors = (num, r) => {
    // robot arm cylinder
    const colors = [];
    for (let n = 0; n < num; n++) {
        const roundness = r*4*3;
        for (let i = 0; i < roundness; i++) {
            colors.push([0.0, 1.0, 0.0, 1.0]);
        }
    }
    return colors;
}
const sphere_colors = (num, r) => {
    const roundness = r * (r-2) /2;
    const colors = [];
    for (let i = 0; i < num; i++) {
        let R0 = Math.random();
        let G0 = Math.random();
        let B0 = Math.random();
        for (let j = 0; j < roundness; j++) {
            colors.push([R0, G0, B0, 1.0]);
            colors.push([R0, G0, B0, 1.0]);
            colors.push([R0, G0, B0, 1.0]);
        }
        let R1 = Math.random();
        let G1 = Math.random();
        let B1 = Math.random();
        for (let j = 0; j < roundness; j++) {
            colors.push([R1, G1, B1, 1.0]);
            colors.push([R1, G1, B1, 1.0]);
            colors.push([R1, G1, B1, 1.0]);
        }
    }
    return colors;
}
const cone_colors = (num, r) => {
    const colors = [];
    let R0 = Math.random();
    let G0 = Math.random();
    let B0 = Math.random();
    for (let i = 0; i < num * r * 6; i++) {
        colors.push([R0, G0, B0, 1.0]);
    }
    return colors;
}
const torus_colors = (num, r) => {
    const colors = [];
    let R0 = Math.random();
    let G0 = Math.random();
    let B0 = Math.random();
    let len = r*r*6*num;
    for (let i = 0; i < len; i++) {
        colors.push([R0, G0, B0, 1.0]);
    }
    return colors;
}
const arm_cylin_colors = (num, r) => {
    // robot arm cylinder
    const colors = [];
    for (let n = 0; n < num; n++) {
        const roundness = r*4*3;
        for (let i = 0; i < roundness; i++) {
            colors.push([0.0, 0.0, 1.0, 1.0]);
        }
    }
    return colors;
}
const arm_cube_colors = (num) => {
    // robot arm cube
    const colors = [];
    for (let i = 0; i < num*36; i++) {
        colors.push([0.0, 0.0, 1.0, 1.0]);
    }
    return colors;
}


const bulb_colors = (num, r) => {
    const roundness = r * (r-2);
    const colors = [];
    for (let i = 0; i < roundness * 3 * num; i++) {
        colors.push([1.0, 1.0, 1.0, 1.0]);
    }
    return colors;
}