var xml_http_request = require('xhr2');
var XMLHttpRequest = xml.XMLHttpRequest;
d = new XMLHttpRequest()
d["open"]("POST", "https://ac.dun.163yun.com/v3/d", !0)
d.withCredentials = false;
d["setRequestHeader"]("Content-type", "application/x-www-form-urlencoded")
d["onreadystatechange"] = function () {
    if (d["readyState"] === 4) if (d["status"] >= 200 && d["status"] < 400) {
        var e,
            c = new RegExp("^" + "__wmjsonp_db5cb96" + "\\((.+)\\)$");

        try {
            console.log(d["responseText"])
            // e = JSON["parse"]((d["responseText"] || "").match(c)[1] || "");

        } catch (q) {
        }
    };
};
d["send"]("d=SZgz%2FzNtP1AvQ4jhbsD%2F3DTPguohJT0LLQzdHT%2BA7GHJs07oqb%2FKQLDBuisrB6tghY%2FIiF%2F1JXtEdUN8wGGP1HIbJnf%2BFcNR%2BxBdzIPU7HbAOt%2BrEw8u3B2HQovme9eTyoazON7%2BGK.iYmGXISmhpQBpc.jyDWMP7lzc.OrkvNZgVL.PST4DrsH8.hbZPpWmT9rCtXCqEhx.rBNTF90WSxMvMoV7QAYidkYX3MaZmGTY%2Bf.lyBnumUIxWbVFgLauFbbEyGCirl2UoDoj4QfpdjfGCbLAeRtxnR.IHZ.99PKy9GxucdApvfrIH61Y2vxxeMn1Hx8lBIdAoI%2FOVGPeAHrsJnV1%2Bv0Cd0kYwaAar.v%2By7xkk8UrOSjS1IyrVi681aGiucMZArifABVhZcPwbyBtz8KY2kgp1GlzuMb91t0gi3Ua7yCCMlHWGyTtn.m%2BS.%2BA1i93un2TSBtNP6ToBLiCLxboG%2BUjqmuwdZak9qaty3HebWG7vqKXRvP7g%2FQZx%2FAK9ZFBtr2%2FGDYjrGFrg2AgKuN9gdQ%2FvREQprGcPcWjsj8Rs46xaaoGHyE.GFWuSwMdR%2FIqaxcOsUJWV06IQsYD8OI%2BgWn1fFUXjVyij1txjz%2FHGnbCVPmKXai6mBRDqCg6aw2rgKTij7isuiXjeVYsZ3o%2BtKsoQdqhaPKdGJAb7Kr.XVRVzhrWm1s4p8mTfojqI8djHO0dPmS6CEHNyl11VBnMXWIqX%2BZknzQBnKyPRU.4.kHNKx3hQUD9tQfT0GencEVxvDsE.TLydhOL.m4hkXtT0ofbYAn2sFA.PIfhy%2FnmPetKmo8l%2FQF%2BdpUliL.JbH9Okc8mNrwZ0g1ltHBYYrx5&v=a02527b8&cb=__wmjsonp_db5cb96")