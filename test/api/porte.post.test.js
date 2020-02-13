const { Porte, chai, expect, request } = require("../common");

const makeReq = async (app, url, body, method) => {
  if (method == "post") {
    const res = await request(app)
      [method](url)
      .send(body)
      .set("Cookie", [
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMDE4ZjZjYzFmZTlkMzBhOThlNGEiLCJpYXQiOjE1ODEyNTY2MzN9.lFxcWJqQX1Psv8ZptzOz1NmZMr0rm131CIcXCBnjrd4; Path=/; HttpOnly"
      ]);
    return res;
  } else {
    const res = await request(app)
      [method](url)
      .set("Cookie", [
        "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTQwMDE4ZjZjYzFmZTlkMzBhOThlNGEiLCJpYXQiOjE1ODEyNTY2MzN9.lFxcWJqQX1Psv8ZptzOz1NmZMr0rm131CIcXCBnjrd4; Path=/; HttpOnly"
      ]);
    return res;
  }
};

const makePostReq = async (app, body) => {
  const res = await makeReq(app, "/api/porte/add_porte", body, "post");
  return res;
};

module.exports = app => {
  it("Sould return error if coo is too long", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:85:6:1:3",
      voisin: [
        { min: 651, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Coordonnées non conforme");
  });

  it("Sould return error if coo contains letters", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:8a5:6:1",
      voisin: [
        { min: 651, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Coordonnées non conforme");
  });

  it("Should return error if voisins length !== 7", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "6:651:6:0",
      voisin: [{ min: 651, max: 651, region: 4 }]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Pas assez de voisin.");
  });

  it("Should add code if code is provided", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:651:6:0",
      code: "jgfdlgkfdjlgkfdjhlkgfdjhgklfdmgjkfd",
      voisin: [
        { min: 651, max: 652, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    const portes = await Porte.find();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("msg");
    expect(res.body.msg).to.be.equal("Porte ajoutée.");
    expect(portes.length).to.be.equal(1);
    expect(portes[0].voisins.length).to.be.equal(7);
    expect(portes[0]).to.have.property("code");
    expect(portes[0].code).to.be.equal("jgfdlgkfdjlgkfdjhlkgfdjhgklfdmgjkfd");
  });

  it("Should return error if not coos", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      voisin: [
        { min: 651, max: 651, region: 4 },
        { min: 651, max: 651, region: 4 },
        { min: 651, max: 651, region: 4 },
        { min: 651, max: 651, region: 4 },
        { min: 651, max: 651, region: 4 },
        { min: 651, max: 651, region: 4 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal('"coo" is required');
  });

  it("Should return error if min === max", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:651:6:0",
      voisin: [
        { min: 651, max: 651, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Min === Max");
  });

  it("Should return error if min > max", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:651:6:0",
      voisin: [
        { min: 652, max: 651, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Min > Max");
  });

  it("Should return error if porte already exists", async () => {
    await Porte.deleteMany({});
    let res;
    for (let i = 0; i < 2; i++) {
      res = await makePostReq(app, {
        coo: "4:651:6:0",
        voisin: [
          { min: 651, max: 652, region: 4 },
          { min: 458, max: 845, region: 4 },
          { min: 458, max: 845, region: 4 },
          { min: 458, max: 845, region: 4 },
          { min: 458, max: 845, region: 4 },
          { min: 458, max: 845, region: 4 },
          { min: 458, max: 845, region: 4 }
        ]
      });
    }
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Coo déjà prises");
    await Porte.deleteMany({});
  });

  it("Should return error if voisin doesnt have region", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:651:6:0",
      voisin: [
        { min: 652, max: 651, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845 }
      ]
    });
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal(
      '"voisin[6].region" is required'
    );
  });

  it("Should create porte if body is good", async () => {
    await Porte.deleteMany({});
    const res = await makePostReq(app, {
      coo: "4:651:6:0",
      voisin: [
        { min: 651, max: 652, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    const portes = await Porte.find();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("msg");
    expect(res.body.msg).to.be.equal("Porte ajoutée.");
    expect(portes.length).to.be.equal(1);
    expect(portes[0].voisins.length).to.be.equal(7);
    await Porte.deleteMany({});
  });
};
