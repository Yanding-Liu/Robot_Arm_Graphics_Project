const ortho = (left, right, bottom, top, near, far) => [
    [2/(right-left), 0.0, 0.0, -(right+left)/(right-left)],
    [0.0, 2/(top-bottom), 0.0, -(top+bottom)/(top-bottom)],
    [0.0, 0.0, 2/(near-far), -(near+far)/(near-far)],
    [0.0, 0.0, 0.0, 1.0]
];

const frustum = (left, right, bottom, top, near, far) => [
    [-2*near/(right-left), 0.0, 0.0, 0.0],
    [0.0, -2*near/(top-bottom), 0.0, 0.0],
    [(left+right)/(right-left), (bottom+top)/(top-bottom), (near+far)/(far-near), -1.0],
    [0.0, 0.0, -2*near*far/(far-near), 0.0]
];