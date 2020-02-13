const { Porte, chai, expect, request } = require("../common");

const makeReq = async (app, url, method) => {
  if (method == "post") {
    const res = await request(app)
      [method](url)
      .send(body);
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

const makePostReq = async (app, query) => {
  const res = await makeReq(app, "/api/porte/get_porte" + query, "get");
  return res;
};

module.exports = app => {
  it("Should return error no coo query", async () => {
    const res = await makePostReq(app, "");
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal('"coo" is required');
  });

  it("Should return error if coo is not good format", async () => {
    const res = await makePostReq(app, "?coo=45.45.14.4");
    expect(res.status).to.be.equal(500);
    expect(res.body).to.have.property("errors");
    expect(res.body.errors).to.have.property("message");
    expect(res.body.errors.message).to.be.equal(
      "45.45.14.4 should be xx:xx:xx:xx"
    );
  });

  it("Should find porte if porte exists", async () => {
    await Porte.deleteMany({});
    const newporte = new Porte({
      coo: "4:651:6:0",
      voisins: [
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    newporte.save();
    const res = await makePostReq(app, "?coo=4:651:6:0");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("portes");
    expect(res.body.portes).to.be.an("array");
    expect(res.body.portes.length).to.be.equal(1);
    await Porte.deleteMany({});
  });

  it("Should not find any porte if not same region", async () => {
    await Porte.deleteMany({});
    const newporte = new Porte({
      coo: "4:651:6:0",
      voisins: [
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    newporte.save();
    const res = await makePostReq(app, "?coo=5:651:6:0");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("portes");
    expect(res.body.portes).to.be.an("array");
    expect(res.body.portes.length).to.be.equal(0);
    await Porte.deleteMany({});
  });

  it("Should not return any porte if same region but not good ss", async () => {
    await Porte.deleteMany({});
    const newporte = new Porte({
      coo: "4:651:6:0",
      voisins: [
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 },
        { min: 458, max: 845, region: 4 }
      ]
    });
    newporte.save();
    const res = await makePostReq(app, "?coo=5:300:6:0");
    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property("portes");
    expect(res.body.portes).to.be.an("array");
    expect(res.body.portes.length).to.be.equal(0);
    await Porte.deleteMany({});
  });
};
