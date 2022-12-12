const v4_log = (vec) => {console.log('['+ vec[0].toFixed(4) + '\t\t' 
                                        + vec[1].toFixed(4) + '\t\t'
                                        + vec[2].toFixed(4) + '\t\t'
                                        + vec[3].toFixed(4) + ']' );}

const v4_mul_sca = (scalar, vec) =>[scalar * vec[0], 
                                    scalar * vec[1],
                                    scalar * vec[2],
                                    scalar * vec[3]];

const v4_add = (vec1, vec2) => [vec1[0] + vec2[0], 
                                vec1[1] + vec2[1], 
                                vec1[2] + vec2[2], 
                                vec1[3] + vec2[3]];

const v4_sub = (vec1, vec2) => [vec1[0] - vec2[0], 
                                vec1[1] - vec2[1], 
                                vec1[2] - vec2[2], 
                                vec1[3] - vec2[3]];                                             

const v4_mag = (vec) => Math.sqrt(vec[0]*vec[0] 
                                + vec[1]*vec[1] 
                                + vec[2]*vec[2] 
                                + vec[3]*vec[3]);

const v4_nor = (vec) => v4_mul_sca(1/v4_mag(vec), vec);

const v4_dot = (vec1, vec2) =>vec1[0]*vec2[0] 
                            + vec1[1]*vec2[1] 
                            + vec1[2]*vec2[2] 
                            + vec1[3]*vec2[3];

const v4_cro = (vec1, vec2) => [vec1[1]*vec2[2] - vec1[2]*vec2[1], 
                                vec1[2]*vec2[0] - vec1[0]*vec2[2], 
                                vec1[0]*vec2[1] - vec1[1]*vec2[0], 0];



const m4_log = (m) =>{console.log(m[0][0].toFixed(4) + '\t\t' 
                                + m[1][0].toFixed(4) + '\t\t' 
                                + m[2][0].toFixed(4) + '\t\t' 
                                + m[3][0].toFixed(4) + '\n' 
                                + m[0][1].toFixed(4) + '\t\t' 
                                + m[1][1].toFixed(4) + '\t\t' 
                                + m[2][1].toFixed(4) + '\t\t' 
                                + m[3][1].toFixed(4) + '\n' 
                                + m[0][2].toFixed(4) + '\t\t' 
                                + m[1][2].toFixed(4) + '\t\t' 
                                + m[2][2].toFixed(4) + '\t\t' 
                                + m[3][2].toFixed(4) + '\n' 
                                + m[0][3].toFixed(4) + '\t\t' 
                                + m[1][3].toFixed(4) + '\t\t' 
                                + m[2][3].toFixed(4) + '\t\t' 
                                + m[3][3].toFixed(4) + '\n' );}

const m4_mul_sca = (scalar, A) => [ [scalar*A[0][0], scalar*A[0][1], scalar*A[0][2], scalar*A[0][3]],
                                    [scalar*A[1][0], scalar*A[1][1], scalar*A[1][2], scalar*A[1][3]],
                                    [scalar*A[2][0], scalar*A[2][1], scalar*A[2][2], scalar*A[2][3]],
                                    [scalar*A[3][0], scalar*A[3][1], scalar*A[3][2], scalar*A[3][3]] ];

const m4_add = (A, B) =>  [ [A[0][0]+B[0][0],A[0][1]+B[0][1],A[0][2]+B[0][2],A[0][3]+B[0][3]],
                            [A[1][0]+B[1][0],A[1][1]+B[1][1],A[1][2]+B[1][2],A[1][3]+B[1][3]],
                            [A[2][0]+B[2][0],A[2][1]+B[2][1],A[2][2]+B[2][2],A[2][3]+B[2][3]],
                            [A[3][0]+B[3][0],A[3][1]+B[3][1],A[3][2]+B[3][2],A[3][3]+B[3][3]] ];

/*
for (let i = 0; i < 4; i++) {
    console.log('[A['+i+'][0]-B['+i+'][0],'
                +'A['+i+'][1]-B['+i+'][1],'
                +'A['+i+'][2]-B['+i+'][2],'
                +'A['+i+'][3]-B['+i+'][3]],'
    );
}
*/

const m4_sub = (A, B) =>  [ [A[0][0]-B[0][0],A[0][1]-B[0][1],A[0][2]-B[0][2],A[0][3]-B[0][3]],
                            [A[1][0]-B[1][0],A[1][1]-B[1][1],A[1][2]-B[1][2],A[1][3]-B[1][3]],
                            [A[2][0]-B[2][0],A[2][1]-B[2][1],A[2][2]-B[2][2],A[2][3]-B[2][3]],
                            [A[3][0]-B[3][0],A[3][1]-B[3][1],A[3][2]-B[3][2],A[3][3]-B[3][3]] ];

const m4_mult_v = (A, vec) => [ A[0][0]*vec[0] + A[1][0]*vec[1] + A[2][0]*vec[2] + A[3][0]*vec[3],
                                A[0][1]*vec[0] + A[1][1]*vec[1] + A[2][1]*vec[2] + A[3][1]*vec[3],
                                A[0][2]*vec[0] + A[1][2]*vec[1] + A[2][2]*vec[2] + A[3][2]*vec[3],
                                A[0][3]*vec[0] + A[1][3]*vec[1] + A[2][3]*vec[2] + A[3][3]*vec[3] ];
/*
for (let i = 0; i < 4; i++) {
    console.log('[A[0]['+i+']*vec[0]'
            + ' + A[1]['+i+']*vec[1]'
            + ' + A[2]['+i+']*vec[2]'
            + ' + A[3]['+i+']*vec[3]],'
    )
}
*/

const m4_mult_m = (A, B) => [ [ A[0][0]*B[0][0] + A[1][0]*B[0][1] + A[2][0]*B[0][2] + A[3][0]*B[0][3],
                                A[0][1]*B[0][0] + A[1][1]*B[0][1] + A[2][1]*B[0][2] + A[3][1]*B[0][3],
                                A[0][2]*B[0][0] + A[1][2]*B[0][1] + A[2][2]*B[0][2] + A[3][2]*B[0][3],
                                A[0][3]*B[0][0] + A[1][3]*B[0][1] + A[2][3]*B[0][2] + A[3][3]*B[0][3] ],
                              [ A[0][0]*B[1][0] + A[1][0]*B[1][1] + A[2][0]*B[1][2] + A[3][0]*B[1][3],
                                A[0][1]*B[1][0] + A[1][1]*B[1][1] + A[2][1]*B[1][2] + A[3][1]*B[1][3],
                                A[0][2]*B[1][0] + A[1][2]*B[1][1] + A[2][2]*B[1][2] + A[3][2]*B[1][3],
                                A[0][3]*B[1][0] + A[1][3]*B[1][1] + A[2][3]*B[1][2] + A[3][3]*B[1][3] ],
                              [ A[0][0]*B[2][0] + A[1][0]*B[2][1] + A[2][0]*B[2][2] + A[3][0]*B[2][3],
                                A[0][1]*B[2][0] + A[1][1]*B[2][1] + A[2][1]*B[2][2] + A[3][1]*B[2][3],
                                A[0][2]*B[2][0] + A[1][2]*B[2][1] + A[2][2]*B[2][2] + A[3][2]*B[2][3],
                                A[0][3]*B[2][0] + A[1][3]*B[2][1] + A[2][3]*B[2][2] + A[3][3]*B[2][3] ],
                              [ A[0][0]*B[3][0] + A[1][0]*B[3][1] + A[2][0]*B[3][2] + A[3][0]*B[3][3],
                                A[0][1]*B[3][0] + A[1][1]*B[3][1] + A[2][1]*B[3][2] + A[3][1]*B[3][3],
                                A[0][2]*B[3][0] + A[1][2]*B[3][1] + A[2][2]*B[3][2] + A[3][2]*B[3][3],
                                A[0][3]*B[3][0] + A[1][3]*B[3][1] + A[2][3]*B[3][2] + A[3][3]*B[3][3] ] ];
/*
for (let i = 0; i < 16; i++) {
    let quo = Math.floor(i/4);
    let mod = i%4;
        console.log( 'A[0]['+(mod)+']*B['+(quo)
                +'][0] + A[1]['+(mod) +']*B['+(quo)
                +'][1] + A[2]['+(mod) +']*B['+(quo)
                +'][2] + A[3]['+(mod)+']*B['+(quo)
                +'][3],'
    );
}
*/ 

const m4_trans = (A) =>[[A[0][0], A[1][0], A[2][0], A[3][0]],
                        [A[0][1], A[1][1], A[2][1], A[3][1]],
                        [A[0][2], A[1][2], A[2][2], A[3][2]],
                        [A[0][3], A[1][3], A[2][3], A[3][3]] ];

const m4_inv = (A) => {
    const det = m4_det(A);
    if (Math.abs(det) < 1e-10) return null;
    
    const minor = m4_minor(A);
    const colfa = m4_colfactor(minor);
    const trans = m4_trans(colfa)
    return m4_mul_sca(1/det, trans);

}
// invert matrix helper functions
const m4_colfactor = (A) =>[[ A[0][0], -A[0][1],  A[0][2], -A[0][3]],
                            [-A[1][0],  A[1][1], -A[1][2],  A[1][3]],
                            [ A[2][0], -A[2][1],  A[2][2], -A[2][3]],
                            [-A[3][0],  A[3][1], -A[3][2],  A[3][3]] ]

const m4_minor = (A) =>[[m3_det(A[1][1], A[1][2], A[1][3], A[2][1], A[2][2], A[2][3], A[3][1], A[3][2], A[3][3]), 
                         m3_det(A[1][0], A[1][2], A[1][3], A[2][0], A[2][2], A[2][3], A[3][0], A[3][2], A[3][3]), 
                         m3_det(A[1][0], A[1][1], A[1][3], A[2][0], A[2][1], A[2][3], A[3][0], A[3][1], A[3][3]), 
                         m3_det(A[1][0], A[1][1], A[1][2], A[2][0], A[2][1], A[2][2], A[3][0], A[3][1], A[3][2])], 
                        [m3_det(A[0][1], A[0][2], A[0][3], A[2][1], A[2][2], A[2][3], A[3][1], A[3][2], A[3][3]), 
                         m3_det(A[0][0], A[0][2], A[0][3], A[2][0], A[2][2], A[2][3], A[3][0], A[3][2], A[3][3]), 
                         m3_det(A[0][0], A[0][1], A[0][3], A[2][0], A[2][1], A[2][3], A[3][0], A[3][1], A[3][3]), 
                         m3_det(A[0][0], A[0][1], A[0][2], A[2][0], A[2][1], A[2][2], A[3][0], A[3][1], A[3][2])], 
                        [m3_det(A[0][1], A[0][2], A[0][3], A[1][1], A[1][2], A[1][3], A[3][1], A[3][2], A[3][3]), 
                         m3_det(A[0][0], A[0][2], A[0][3], A[1][0], A[1][2], A[1][3], A[3][0], A[3][2], A[3][3]), 
                         m3_det(A[0][0], A[0][1], A[0][3], A[1][0], A[1][1], A[1][3], A[3][0], A[3][1], A[3][3]), 
                         m3_det(A[0][0], A[0][1], A[0][2], A[1][0], A[1][1], A[1][2], A[3][0], A[3][1], A[3][2])], 
                        [m3_det(A[0][1], A[0][2], A[0][3], A[1][1], A[1][2], A[1][3], A[2][1], A[2][2], A[2][3]), 
                         m3_det(A[0][0], A[0][2], A[0][3], A[1][0], A[1][2], A[1][3], A[2][0], A[2][2], A[2][3]), 
                         m3_det(A[0][0], A[0][1], A[0][3], A[1][0], A[1][1], A[1][3], A[2][0], A[2][1], A[2][3]), 
                         m3_det(A[0][0], A[0][1], A[0][2], A[1][0], A[1][1], A[1][2], A[2][0], A[2][1], A[2][2])] ];

/*
let res = '';
for (let i = 0; i < 16; i++) {
    let str = 'm3_det(';
    
    for (let c = 0; c < 4; c++) {
        for (let r = 0; r < 4; r++) {
            if (i%4 != r && Math.floor(i/4) != c) {
                str = str + 'A[' + (c*4+r) + '], ';
            }
        } 
    }
    str = str.slice(0, -2)+'), \n';
    res += str;
}
*/

const m4_det = (A) => A[0][0] * m3_det(A[1][1], A[1][2], A[1][3], A[2][1], A[2][2], A[2][3], A[3][1], A[3][2], A[3][3])
                    - A[1][0] * m3_det(A[0][1], A[0][2], A[0][3], A[2][1], A[2][2], A[2][3], A[3][1], A[3][2], A[3][3])
                    + A[2][0] * m3_det(A[0][1], A[0][2], A[0][3], A[1][1], A[1][2], A[1][3], A[3][1], A[3][2], A[3][3])
                    - A[3][0] * m3_det(A[0][1], A[0][2], A[0][3], A[1][1], A[1][2], A[1][3], A[2][1], A[2][2], A[2][3]);

const m3_det = (a,b,c,d,e,f,g,h,i) => a*e*i + b*f*g + c*d*h - g*e*c - h*f*a - i*d*b;






const m4_move = (x, y, z) =>  [ [1.0, 0.0, 0.0, 0.0], 
                                [0.0, 1.0, 0.0, 0.0], 
                                [0.0, 0.0, 1.0, 0.0], 
                                [x, y, z, 1.0] ];

const m4_sca = (x, y, z) =>[[x  , 0.0, 0.0, 0.0], 
                            [0.0, y  , 0.0, 0.0], 
                            [0.0, 0.0, z  , 0.0], 
                            [0.0, 0.0, 0.0, 1.0] ];

const m4_rotX = (rad) =>  [ [1.0, 0.0, 0.0, 0.0],
                            [0.0, Math.cos(rad), -Math.sin(rad), 0.0],
                            [0.0, Math.sin(rad),  Math.cos(rad), 0.0],
                            [0.0, 0.0, 0.0, 1.0]];

const m4_rotY = (rad) =>  [ [ Math.cos(rad), 0.0, Math.sin(rad), 0.0], 
                            [0.0, 1.0, 0.0, 0.0], 
                            [-Math.sin(rad), 0.0, Math.cos(rad), 0.0], 
                            [0.0, 0.0, 0.0, 1.0]];

const m4_rotZ = (rad) =>  [ [Math.cos(rad), -Math.sin(rad), 0.0, 0.0], 
                            [Math.sin(rad),  Math.cos(rad), 0.0, 0.0],  
                            [0.0, 0.0, 1.0, 0.0], 
                            [0.0, 0.0, 0.0, 1.0]];

const m4_rotXYZ = (rx, ry, rz) => m4_mult_m(m4_mult_m(m4_rotX(rx), m4_rotY(ry)), m4_rotZ(rz));

const look_at = (eye, at, up) => {
    let v = v4_sub(
        up, 
        v4_mul_sca(
            v4_dot(up, at)/v4_dot(at, at),
            at,
        ),
    );
    let u_prime = v4_nor(v4_cro(v, at));
    let v_prime = v4_nor(v);
    let n_prime = v4_nor(at);
    
    return m4_mult_m(
        [
            [u_prime[0], v_prime[0], n_prime[0], 0.0],
            [u_prime[1], v_prime[1], n_prime[1], 0.0],
            [u_prime[2], v_prime[2], n_prime[2], 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ], 
        m4_move(eye[0], eye[1], eye[2])
    );
}

// not a vector multiplication, for light purpose
const v4_mul_dot = (vec1, vec2) => [
    vec1[0] * vec2[0],
    vec1[1] * vec2[1],
    vec1[2] * vec2[2],
    vec1[3] * vec2[3],
]