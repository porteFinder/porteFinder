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

const addPorte = async app => {
  const res = await makeReq(
    app,
    "/api/porte/add_porte",
    {
      coo: [
        Math.floor(Math.random() * 20),
        Math.floor(Math.random() * 500),
        Math.floor(Math.random() * 15),
        Math.floor(Math.random() * 6)
      ].join(":"),
      voisin: [
        { min: 651, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    },
    "post"
  );
  return res.body.porte;
};

const makePostReq = async (app, body) => {
  const res = await makeReq(app, "/api/porte/update", { porte: body }, "post");
  return res;
};

module.exports = app => {
  it("Should return error if not enough voisins", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte.voisins.splice(2, 1);
    const res = await makePostReq(app, porte);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Pas assez de voisins.");
  });

  it("Sould return error if porte doesnt exists", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte._id = "jhfgdsk;lfndksjl";
    const res = await makePostReq(app, porte);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Cette porte n'existe pas");
  });

  it("Sould return error if Min === Max", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte.voisins[2] = { region: "45", min: 5, max: 5 };
    const res = await makePostReq(app, porte);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("Min === Max");
  });

  it("Sould return error if Min > Max", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte.voisins[2] = { region: "45", min: 6, max: 5 };
    const res = await makePostReq(app, porte);
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal("SS 6 > SS 5");
  });

  it("Should udpate porte if body is good", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte.voisins[2] = { region: "45", min: 0, max: 5 };
    const res = await makePostReq(app, porte);
    const porteDB = await Porte.find();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("porte");
    expect(res.body.porte).to.have.property("voisins");
    expect(res.body.porte.voisins).to.be.an("array");
    expect(res.body.porte.voisins[2].region).to.be.equal(
      porteDB[0].voisins[2].region
    );
    expect(res.body.porte.voisins[2].min).to.be.equal(
      porteDB[0].voisins[2].min
    );
    expect(res.body.porte.voisins[2].max).to.be.equal(
      porteDB[0].voisins[2].max
    );
  });

  it("Should add code if code is in update", async () => {
    await Porte.deleteMany({});
    const porte = await addPorte(app);
    porte.code = "jglkdfjgfkd";
    const res = await makePostReq(app, porte);
    const porteDB = await Porte.find();
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("porte");
    expect(res.body.porte).to.have.property("voisins");
    expect(res.body.porte.voisins).to.be.an("array");
    expect(res.body.porte.code).to.be.equal(porteDB[0].code);
    expect(res.body.porte.code).to.be.equal("jglkdfjgfkd");
    await Porte.deleteMany({});
  });
};
