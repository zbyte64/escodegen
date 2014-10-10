/*
  Taken from esprima-fb's tests; we run them backward.
  This is only the JSX tests, not the type annotation tests,
  and it doesn't have the error message tests, which only
  apply to parsing, not generating.

  The test for whitespace inside of an opening element was removed,
  because we do not attempt to reconstruct such whitespace.
  The test with the element name 'AbC-def' was also altered to remove
  such whitespace from the expected result.
  The test for comments inside expression containers was removed.
*/

'use strict';

var esprima = require('./3rdparty/esprima'),
    escodegen = require('./loader'),
    chai = require('chai'),
    expect = chai.expect,
    data;

data = {
    'XJS': {
        '<a />': {
            type: "ExpressionStatement",
            expression: {
                type: "XJSElement",
                openingElement: {
                  type: "XJSOpeningElement",
                  name: {
                      type: "XJSIdentifier",
                      name: "a",
                      range: [1, 2],
                      loc: {
                          start: { line: 1, column: 1 },
                          end: { line: 1, column: 2 }
                      }
                  },
                  selfClosing: true,
                  attributes: [],
                  range: [0, 5],
                  loc: {
                      start: { line: 1, column: 0 },
                      end: { line: 1, column: 5 }
                  }
                },
                closingElement: null,
                children: [],
                range: [0, 5],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 5 }
                }
            },
            range: [0, 5],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 5 }
            }
        },
        '<n:a n:v />': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSNamespacedName',
                        namespace: {
                            type: 'XJSIdentifier',
                            name: 'n',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        },
                        name: {
                            type: 'XJSIdentifier',
                            name: 'a',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        range: [1, 4],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    selfClosing: true,
                    attributes: [{
                        type: 'XJSAttribute',
                        name: {
                            type: 'XJSNamespacedName',
                            namespace: {
                                type: 'XJSIdentifier',
                                name: 'n',
                                range: [5, 6],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 6 }
                                }
                            },
                            name: {
                                type: 'XJSIdentifier',
                                name: 'v',
                                range: [7, 8],
                                loc: {
                                    start: { line: 1, column: 7 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            range: [5, 8],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: null,
                        range: [5, 8],
                        loc: {
                            start: { line: 1, column: 5 },
                            end: { line: 1, column: 8 }
                        }
                    }],
                    range: [0, 11],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 11 }
                    }
                },
                closingElement: null,
                children: [],
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },
        '<a n:foo="bar"> {value} <b><c /></b></a>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'a',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    selfClosing: false,
                    attributes: [{
                        type: 'XJSAttribute',
                        name: {
                            type: 'XJSNamespacedName',
                            namespace: {
                                type: 'XJSIdentifier',
                                name: 'n',
                                range: [3, 4],
                                loc: {
                                    start: { line: 1, column: 3 },
                                    end: { line: 1, column: 4 }
                                }
                            },
                            name: {
                                type: 'XJSIdentifier',
                                name: 'foo',
                                range: [5, 8],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 8 }
                                }
                            },
                            range: [3, 8],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        value: {
                            type: 'Literal',
                            value: 'bar',
                            raw: '"bar"',
                            range: [9, 14],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        range: [3, 14],
                        loc: {
                            start: { line: 1, column: 3 },
                            end: { line: 1, column: 14 }
                        }
                    }],
                    range: [0, 15],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 15 }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'a',
                        range: [38, 39],
                        loc: {
                            start: { line: 1, column: 38 },
                            end: { line: 1, column: 39 }
                        }
                    },
                    range: [36, 40],
                    loc: {
                        start: { line: 1, column: 36 },
                        end: { line: 1, column: 40 }
                    }
                },
                children: [{
                    type: 'Literal',
                    value: ' ',
                    raw: ' ',
                    range: [15, 16],
                    loc: {
                        start: { line: 1, column: 15 },
                        end: { line: 1, column: 16 }
                    }
                }, {
                    type: 'XJSExpressionContainer',
                    expression: {
                        type: 'Identifier',
                        name: 'value',
                        range: [17, 22],
                        loc: {
                            start: { line: 1, column: 17 },
                            end: { line: 1, column: 22 }
                        }
                    },
                    range: [16, 23],
                    loc: {
                        start: { line: 1, column: 16 },
                        end: { line: 1, column: 23 }
                    }
                }, {
                    type: 'Literal',
                    value: ' ',
                    raw: ' ',
                    range: [23, 24],
                    loc: {
                        start: { line: 1, column: 23 },
                        end: { line: 1, column: 24 }
                    }
                }, {
                    type: 'XJSElement',
                    openingElement: {
                        type: 'XJSOpeningElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'b',
                            range: [25, 26],
                            loc: {
                                start: { line: 1, column: 25 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        selfClosing: false,
                        attributes: [],
                        range: [24, 27],
                        loc: {
                            start: { line: 1, column: 24 },
                            end: { line: 1, column: 27 }
                        }
                    },
                    closingElement: {
                        type: 'XJSClosingElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'b',
                            range: [34, 35],
                            loc: {
                                start: { line: 1, column: 34 },
                                end: { line: 1, column: 35 }
                            }
                        },
                        range: [32, 36],
                        loc: {
                            start: { line: 1, column: 32 },
                            end: { line: 1, column: 36 }
                        }
                    },
                    children: [{
                        type: 'XJSElement',
                        openingElement: {
                            type: 'XJSOpeningElement',
                            name: {
                                type: 'XJSIdentifier',
                                name: 'c',
                                range: [28, 29],
                                loc: {
                                    start: { line: 1, column: 28 },
                                    end: { line: 1, column: 29 }
                                }
                            },
                            selfClosing: true,
                            attributes: [],
                            range: [27, 32],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 32 }
                            }
                        },
                        closingElement: null,
                        children: [],
                        range: [27, 32],
                        loc: {
                            start: { line: 1, column: 27 },
                            end: { line: 1, column: 32 }
                        }
                    }],
                    range: [24, 36],
                    loc: {
                        start: { line: 1, column: 24 },
                        end: { line: 1, column: 36 }
                    }
                }],
                range: [0, 40],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 40 }
                }
            },
            range: [0, 40],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 40 }
            }
        },
        '<a b={" "} c=" " d="&amp;" e="id=1&group=2" f="&#123456789" g="&#123*;" h="&#x;" />': {
            type: "ExpressionStatement",
            expression: {
                type: "XJSElement",
                openingElement: {
                    type: "XJSOpeningElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "a",
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    selfClosing: true,
                    attributes: [
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "b",
                                range: [3, 4],
                                loc: {
                                    start: { line: 1, column: 3 },
                                    end: { line: 1, column: 4 }
                                }
                            },
                            value: {
                                type: "XJSExpressionContainer",
                                expression: {
                                    type: "Literal",
                                    value: " ",
                                    raw: "\" \"",
                                    range: [6, 9],
                                    loc: {
                                        start: { line: 1, column: 6 },
                                        end: { line: 1, column: 9 }
                                    }
                                },
                                range: [5, 10],
                                loc: {
                                    start: { line: 1, column: 5 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            range: [3, 10],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "c",
                                range: [11, 12],
                                loc: {
                                    start: { line: 1, column: 11 },
                                    end: { line: 1, column: 12 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: " ",
                                raw: "\" \"",
                                range: [13, 16],
                                loc: {
                                    start: { line: 1, column: 13 },
                                    end: { line: 1, column: 16 }
                                }
                            },
                            range: [11, 16],
                            loc: {
                                start: { line: 1, column: 11 },
                                end: { line: 1, column: 16 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "d",
                                range: [17, 18],
                                loc: {
                                    start: { line: 1, column: 17 },
                                    end: { line: 1, column: 18 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "&",
                                raw: "\"&amp;\"",
                                range: [19, 26],
                                loc: {
                                    start: { line: 1, column: 19 },
                                    end: { line: 1, column: 26 }
                                }
                            },
                            range: [17, 26],
                            loc: {
                                start: { line: 1, column: 17 },
                                end: { line: 1, column: 26 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "e",
                                range: [27, 28],
                                loc: {
                                    start: { line: 1, column: 27 },
                                    end: { line: 1, column: 28 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "id=1&group=2",
                                raw: "\"id=1&group=2\"",
                                range: [29, 43],
                                loc: {
                                    start: { line: 1, column: 29 },
                                    end: { line: 1, column: 43 }
                                }
                            },
                            range: [27, 43],
                            loc: {
                                start: { line: 1, column: 27 },
                                end: { line: 1, column: 43 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "f",
                                range: [44, 45],
                                loc: {
                                    start: { line: 1, column: 44 },
                                    end: { line: 1, column: 45 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "&#123456789",
                                raw: "\"&#123456789\"",
                                range: [46, 59],
                                loc: {
                                    start: { line: 1, column: 46 },
                                    end: { line: 1, column: 59 }
                                }
                            },
                            range: [44, 59],
                            loc: {
                                start: { line: 1, column: 44 },
                                end: { line: 1, column: 59 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "g",
                                range: [60, 61],
                                loc: {
                                    start: { line: 1, column: 60 },
                                    end: { line: 1, column: 61 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "&#123*;",
                                raw: "\"&#123*;\"",
                                range: [62, 71],
                                loc: {
                                    start: { line: 1, column: 62 },
                                    end: { line: 1, column: 71 }
                                }
                            },
                            range: [60, 71],
                            loc: {
                                start: { line: 1, column: 60 },
                                end: { line: 1, column: 71 }
                            }
                        },
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "h",
                                range: [72, 73],
                                loc: {
                                    start: { line: 1, column: 72 },
                                    end: { line: 1, column: 73 }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "&#x;",
                                raw: "\"&#x;\"",
                                range: [74, 80],
                                loc: {
                                    start: { line: 1, column: 74 },
                                    end: { line: 1, column: 80 }
                                }
                            },
                            range: [72, 80],
                            loc: {
                                start: { line: 1, column: 72 },
                                end: { line: 1, column: 80 }
                            }
                        }
                    ],
                    range: [0, 83],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 83 }
                    }
                },
                closingElement: null,
                children: [],
                range: [0, 83],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 83 }
                }
            },
            range: [0, 83],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 83 }
            }
        },
        '<日本語></日本語>': {
            type: "ExpressionStatement",
            expression: {
                type: "XJSElement",
                openingElement: {
                    type: "XJSOpeningElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "日本語",
                        range: [
                            1,
                            4
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [
                        0,
                        5
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                closingElement: {
                    type: "XJSClosingElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "日本語",
                        range: [
                            7,
                            10
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 7
                            },
                            end: {
                                line: 1,
                                column: 10
                            }
                        }
                    },
                    range: [
                        5,
                        11
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                },
                children: [],
                range: [
                    0,
                    11
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 11
                    }
                }
            },
            range: [
                0,
                11
            ],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 11
                }
            }
        },

        '<AbC-def test="&#x0026;&#38;">\nbar\nbaz\r\n</AbC-def>': {
            type: "ExpressionStatement",
            expression: {
                type: "XJSElement",
                openingElement: {
                    type: "XJSOpeningElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "AbC-def",
                        range: [
                            1,
                            8
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 8
                            }
                        }
                    },
                    selfClosing: false,
                    attributes: [
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "test",
                                range: [
                                    11,
                                    15
                                ],
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 2
                                    },
                                    end: {
                                        line: 2,
                                        column: 6
                                    }
                                }
                            },
                            value: {
                                type: "Literal",
                                value: "&&",
                                raw: "\"&#x0026;&#38;\"",
                                range: [
                                    16,
                                    31
                                ],
                                loc: {
                                    start: {
                                        line: 2,
                                        column: 7
                                    },
                                    end: {
                                        line: 2,
                                        column: 22
                                    }
                                }
                            },
                            range: [
                                11,
                                31
                            ],
                            loc: {
                                start: {
                                    line: 2,
                                    column: 2
                                },
                                end: {
                                    line: 2,
                                    column: 22
                                }
                            }
                        }
                    ],
                    range: [
                        0,
                        32
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 2,
                            column: 23
                        }
                    }
                },
                closingElement: {
                    type: "XJSClosingElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "AbC-def",
                        range: [
                            44,
                            51
                        ],
                        loc: {
                            start: {
                                line: 5,
                                column: 2
                            },
                            end: {
                                line: 5,
                                column: 9
                            }
                        }
                    },
                    range: [
                        42,
                        52
                    ],
                    loc: {
                        start: {
                            line: 5,
                            column: 0
                        },
                        end: {
                            line: 5,
                            column: 10
                        }
                    }
                },
                children: [
                    {
                        type: "Literal",
                        value: "\nbar\nbaz\r\n",
                        raw: "\nbar\nbaz\r\n",
                        range: [
                            32,
                            42
                        ],
                        loc: {
                            start: {
                                line: 2,
                                column: 23
                            },
                            end: {
                                line: 5,
                                column: 0
                            }
                        }
                    }
                ],
                range: [
                    0,
                    52
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 5,
                        column: 10
                    }
                }
            },
            range: [
                0,
                52
            ],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 5,
                    column: 10
                }
            }
        },

        '<a b={x ? <c /> : <d />} />': {
            type: "ExpressionStatement",
            expression: {
                type: "XJSElement",
                openingElement: {
                    type: "XJSOpeningElement",
                    name: {
                        type: "XJSIdentifier",
                        name: "a",
                        range: [
                            1,
                            2
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 2
                            }
                        }
                    },
                    selfClosing: true,
                    attributes: [
                        {
                            type: "XJSAttribute",
                            name: {
                                type: "XJSIdentifier",
                                name: "b",
                                range: [
                                    3,
                                    4
                                ],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 3
                                    },
                                    end: {
                                        line: 1,
                                        column: 4
                                    }
                                }
                            },
                            value: {
                                type: "XJSExpressionContainer",
                                expression: {
                                    type: "ConditionalExpression",
                                    test: {
                                        type: "Identifier",
                                        name: "x",
                                        range: [
                                            6,
                                            7
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 6
                                            },
                                            end: {
                                                line: 1,
                                                column: 7
                                            }
                                        }
                                    },
                                    consequent: {
                                        type: "XJSElement",
                                        openingElement: {
                                            type: "XJSOpeningElement",
                                            name: {
                                                type: "XJSIdentifier",
                                                name: "c",
                                                range: [
                                                    11,
                                                    12
                                                ],
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 11
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 12
                                                    }
                                                }
                                            },
                                            selfClosing: true,
                                            attributes: [],
                                            range: [
                                                10,
                                                15
                                            ],
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 10
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 15
                                                }
                                            }
                                        },
                                        closingElement: null,
                                        children: [],
                                        range: [
                                            10,
                                            15
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 10
                                            },
                                            end: {
                                                line: 1,
                                                column: 15
                                            }
                                        }
                                    },
                                    alternate: {
                                        type: "XJSElement",
                                        openingElement: {
                                            type: "XJSOpeningElement",
                                            name: {
                                                type: "XJSIdentifier",
                                                name: "d",
                                                range: [
                                                    19,
                                                    20
                                                ],
                                                loc: {
                                                    start: {
                                                        line: 1,
                                                        column: 19
                                                    },
                                                    end: {
                                                        line: 1,
                                                        column: 20
                                                    }
                                                }
                                            },
                                            selfClosing: true,
                                            attributes: [],
                                            range: [
                                                18,
                                                23
                                            ],
                                            loc: {
                                                start: {
                                                    line: 1,
                                                    column: 18
                                                },
                                                end: {
                                                    line: 1,
                                                    column: 23
                                                }
                                            }
                                        },
                                        closingElement: null,
                                        children: [],
                                        range: [
                                            18,
                                            23
                                        ],
                                        loc: {
                                            start: {
                                                line: 1,
                                                column: 18
                                            },
                                            end: {
                                                line: 1,
                                                column: 23
                                            }
                                        }
                                    },
                                    range: [
                                        6,
                                        23
                                    ],
                                    loc: {
                                        start: {
                                            line: 1,
                                            column: 6
                                        },
                                        end: {
                                            line: 1,
                                            column: 23
                                        }
                                    }
                                },
                                range: [
                                    5,
                                    24
                                ],
                                loc: {
                                    start: {
                                        line: 1,
                                        column: 5
                                    },
                                    end: {
                                        line: 1,
                                        column: 24
                                    }
                                }
                            },
                            range: [
                                3,
                                24
                            ],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 3
                                },
                                end: {
                                    line: 1,
                                    column: 24
                                }
                            }
                        }
                    ],
                    range: [
                        0,
                        27
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 27
                        }
                    }
                },
                closingElement: null,
                children: [],
                range: [
                    0,
                    27
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 27
                    }
                }
            },
            range: [
                0,
                27
            ],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 27
                }
            }
        },

        '<a>{}</a>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'a',
                        range: [1, 2],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 2 }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [0, 3],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 3 }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'a',
                        range: [7, 8],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    range: [5, 9],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 9 }
                    }
                },
                children: [{
                    type: 'XJSExpressionContainer',
                    expression: {
                        type: 'XJSEmptyExpression',
                        range: [4, 4],
                        loc: {
                            start: { line: 1, column: 4 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    range: [3, 5],
                    loc: {
                        start: { line: 1, column: 3 },
                        end: { line: 1, column: 5 }
                    }
                }],
                range: [0, 9],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 9 }
                }
            },
            range: [0, 9],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 9 }
            }
        },

        '<div>@test content</div>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'div',
                        range: [1, 4],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'div',
                        range: [20, 23],
                        loc: {
                            start: { line: 1, column: 20 },
                            end: { line: 1, column: 23 }
                        }
                    },
                    range: [18, 24],
                    loc: {
                        start: { line: 1, column: 18 },
                        end: { line: 1, column: 24 }
                    }
                },
                children: [{
                    type: 'Literal',
                    value: '@test content',
                    raw: '@test content',
                    range: [5, 18],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 18 }
                    }
                }],
                range: [0, 24],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 24 }
                }
            },
            range: [0, 24],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 24 }
            }
        },

        '<div><br />7x invalid-js-identifier</div>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'div',
                        range: [
                            1,
                            4
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 1
                            },
                            end: {
                                line: 1,
                                column: 4
                            }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [
                        0,
                        5
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 0
                        },
                        end: {
                            line: 1,
                            column: 5
                        }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSIdentifier',
                        name: 'div',
                        range: [
                            37,
                            40
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 37
                            },
                            end: {
                                line: 1,
                                column: 40
                            }
                        }
                    },
                    range: [
                        35,
                        41
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 35
                        },
                        end: {
                            line: 1,
                            column: 41
                        }
                    }
                },
                children: [{
                    type: 'XJSElement',
                    openingElement: {
                        type: 'XJSOpeningElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'br',
                            range: [
                                6,
                                8
                            ],
                            loc: {
                                start: {
                                    line: 1,
                                    column: 6
                                },
                                end: {
                                    line: 1,
                                    column: 8
                                }
                            }
                        },
                        selfClosing: true,
                        attributes: [],
                        range: [
                            5,
                            11
                        ],
                        loc: {
                            start: {
                                line: 1,
                                column: 5
                            },
                            end: {
                                line: 1,
                                column: 11
                            }
                        }
                    },
                    closingElement: null,
                    children: [],
                    range: [
                        5,
                        11
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 5
                        },
                        end: {
                            line: 1,
                            column: 11
                        }
                    }
                }, {
                    type: 'Literal',
                    value: '7x invalid-js-identifier',
                    raw: '7x invalid-js-identifier',
                    range: [
                        11,
                        35
                    ],
                    loc: {
                        start: {
                            line: 1,
                            column: 11
                        },
                        end: {
                            line: 1,
                            column: 35
                        }
                    }
                }],
                range: [
                    0,
                    41
                ],
                loc: {
                    start: {
                        line: 1,
                        column: 0
                    },
                    end: {
                        line: 1,
                        column: 41
                    }
                }
            },
            range: [
                0,
                41
            ],
            loc: {
                start: {
                    line: 1,
                    column: 0
                },
                end: {
                    line: 1,
                    column: 41
                }
            }
        },

        '<LeftRight left=<a /> right=<b>monkeys /> gorillas</b> />': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "XJSElement",
                "openingElement": {
                    "type": "XJSOpeningElement",
                    "name": {
                        "type": "XJSIdentifier",
                        "name": "LeftRight",
                        "range": [
                            1,
                            10
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 10
                            }
                        }
                    },
                    "selfClosing": true,
                    "attributes": [
                        {
                            "type": "XJSAttribute",
                            "name": {
                                "type": "XJSIdentifier",
                                "name": "left",
                                "range": [
                                    11,
                                    15
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 11
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 15
                                    }
                                }
                            },
                            "value": {
                                "type": "XJSElement",
                                "openingElement": {
                                    "type": "XJSOpeningElement",
                                    "name": {
                                        "type": "XJSIdentifier",
                                        "name": "a",
                                        "range": [
                                            17,
                                            18
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 17
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 18
                                            }
                                        }
                                    },
                                    "selfClosing": true,
                                    "attributes": [],
                                    "range": [
                                        16,
                                        21
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 16
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 21
                                        }
                                    }
                                },
                                closingElement: null,
                                "children": [],
                                "range": [
                                    16,
                                    21
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 21
                                    }
                                }
                            },
                            "range": [
                                11,
                                21
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 11
                                },
                                "end": {
                                    "line": 1,
                                    "column": 21
                                }
                            }
                        },
                        {
                            "type": "XJSAttribute",
                            "name": {
                                "type": "XJSIdentifier",
                                "name": "right",
                                "range": [
                                    22,
                                    27
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 22
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 27
                                    }
                                }
                            },
                            "value": {
                                "type": "XJSElement",
                                "openingElement": {
                                    "type": "XJSOpeningElement",
                                    "name": {
                                        "type": "XJSIdentifier",
                                        "name": "b",
                                        "range": [
                                            29,
                                            30
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 29
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 30
                                            }
                                        }
                                    },
                                    "selfClosing": false,
                                    "attributes": [],
                                    "range": [
                                        28,
                                        31
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 28
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 31
                                        }
                                    }
                                },
                                "closingElement": {
                                    "type": "XJSClosingElement",
                                    "name": {
                                        "type": "XJSIdentifier",
                                        "name": "b",
                                        "range": [
                                            52,
                                            53
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 52
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 53
                                            }
                                        }
                                    },
                                    "range": [
                                        50,
                                        54
                                    ],
                                    "loc": {
                                        "start": {
                                            "line": 1,
                                            "column": 50
                                        },
                                        "end": {
                                            "line": 1,
                                            "column": 54
                                        }
                                    }
                                },
                                "children": [
                                    {
                                        "type": "Literal",
                                        "value": "monkeys /> gorillas",
                                        "raw": "monkeys /> gorillas",
                                        "range": [
                                            31,
                                            50
                                        ],
                                        "loc": {
                                            "start": {
                                                "line": 1,
                                                "column": 31
                                            },
                                            "end": {
                                                "line": 1,
                                                "column": 50
                                            }
                                        }
                                    }
                                ],
                                "range": [
                                    28,
                                    54
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 28
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 54
                                    }
                                }
                            },
                            "range": [
                                22,
                                54
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 22
                                },
                                "end": {
                                    "line": 1,
                                    "column": 54
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        57
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 57
                        }
                    }
                },
                closingElement: null,
                "children": [],
                "range": [
                    0,
                    57
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 57
                    }
                }
            },
            "range": [
                0,
                57
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 57
                }
            }
        },

        '<a.b></a.b>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSMemberExpression',
                        object: {
                            type: 'XJSIdentifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 2 }
                            }
                        },
                        property: {
                            type: 'XJSIdentifier',
                            name: 'b',
                            range: [3, 4],
                            loc: {
                                start: { line: 1, column: 3 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        range: [1, 4],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 4 }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [0, 5],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 5 }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSMemberExpression',
                        object: {
                            type: 'XJSIdentifier',
                            name: 'a',
                            range: [7, 8],
                            loc: {
                                start: { line: 1, column: 7 },
                                end: { line: 1, column: 8 }
                            }
                        },
                        property: {
                            type: 'XJSIdentifier',
                            name: 'b',
                            range: [9, 10],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 10 }
                            }
                        },
                        range: [7, 10],
                        loc: {
                            start: { line: 1, column: 7 },
                            end: { line: 1, column: 10 }
                        }
                    },
                    range: [5, 11],
                    loc: {
                        start: { line: 1, column: 5 },
                        end: { line: 1, column: 11 }
                    }
                },
                children: [],
                range: [0, 11],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 11 }
                }
            },
            range: [0, 11],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 11 }
            }
        },

        '<a.b.c></a.b.c>': {
            type: 'ExpressionStatement',
            expression: {
                type: 'XJSElement',
                openingElement: {
                    type: 'XJSOpeningElement',
                    name: {
                        type: 'XJSMemberExpression',
                        object: {
                            type: 'XJSMemberExpression',
                            object: {
                                type: 'XJSIdentifier',
                                name: 'a',
                                range: [1, 2],
                                loc: {
                                    start: { line: 1, column: 1 },
                                    end: { line: 1, column: 2 }
                                }
                            },
                            property: {
                                type: 'XJSIdentifier',
                                name: 'b',
                                range: [3, 4],
                                loc: {
                                    start: { line: 1, column: 3 },
                                    end: { line: 1, column: 4 }
                                }
                            },
                            range: [1, 4],
                            loc: {
                                start: { line: 1, column: 1 },
                                end: { line: 1, column: 4 }
                            }
                        },
                        property: {
                            type: 'XJSIdentifier',
                            name: 'c',
                            range: [5, 6],
                            loc: {
                                start: { line: 1, column: 5 },
                                end: { line: 1, column: 6 }
                            }
                        },
                        range: [1, 6],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 6 }
                        }
                    },
                    selfClosing: false,
                    attributes: [],
                    range: [0, 7],
                    loc: {
                        start: { line: 1, column: 0 },
                        end: { line: 1, column: 7 }
                    }
                },
                closingElement: {
                    type: 'XJSClosingElement',
                    name: {
                        type: 'XJSMemberExpression',
                        object: {
                            type: 'XJSMemberExpression',
                            object: {
                                type: 'XJSIdentifier',
                                name: 'a',
                                range: [9, 10],
                                loc: {
                                    start: { line: 1, column: 9 },
                                    end: { line: 1, column: 10 }
                                }
                            },
                            property: {
                                type: 'XJSIdentifier',
                                name: 'b',
                                range: [11, 12],
                                loc: {
                                    start: { line: 1, column: 11 },
                                    end: { line: 1, column: 12 }
                                }
                            },
                            range: [9, 12],
                            loc: {
                                start: { line: 1, column: 9 },
                                end: { line: 1, column: 12 }
                            }
                        },
                        property: {
                            type: 'XJSIdentifier',
                            name: 'c',
                            range: [13, 14],
                            loc: {
                                start: { line: 1, column: 13 },
                                end: { line: 1, column: 14 }
                            }
                        },
                        range: [9, 14],
                        loc: {
                            start: { line: 1, column: 9 },
                            end: { line: 1, column: 14 }
                        }
                    },
                    range: [7, 15],
                    loc: {
                        start: { line: 1, column: 7 },
                        end: { line: 1, column: 15 }
                    }
                },
                children: [],
                range: [0, 15],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 15 }
                }
            },
            range: [0, 15],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 15 }
            }
        },

        // In order to more useful parse errors, we disallow following an
        // XJSElement by a less-than symbol. In the rare case that the binary
        // operator was intended, the tag can be wrapped in parentheses:
        '(<div />) < x': {
            type: 'ExpressionStatement',
            expression: {
                type: 'BinaryExpression',
                operator: '<',
                left: {
                    type: 'XJSElement',
                    openingElement: {
                        type: 'XJSOpeningElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'div',
                            range: [2, 5],
                            loc: {
                                start: { line: 1, column: 2 },
                                end: { line: 1, column: 5 }
                            }
                        },
                        selfClosing: true,
                        attributes: [],
                        range: [1, 8],
                        loc: {
                            start: { line: 1, column: 1 },
                            end: { line: 1, column: 8 }
                        }
                    },
                    closingElement: null,
                    children: [],
                    range: [1, 8],
                    loc: {
                        start: { line: 1, column: 1 },
                        end: { line: 1, column: 8 }
                    }
                },
                right: {
                    type: 'Identifier',
                    name: 'x',
                    range: [12, 13],
                    loc: {
                        start: { line: 1, column: 12 },
                        end: { line: 1, column: 13 }
                    }
                },
                range: [0, 13],
                loc: {
                    start: { line: 1, column: 0 },
                    end: { line: 1, column: 13 }
                }
            },
            range: [0, 14],
            loc: {
                start: { line: 1, column: 0 },
                end: { line: 1, column: 14 }
            }
        },

        '<div {...props} />': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "XJSElement",
                "openingElement": {
                    "type": "XJSOpeningElement",
                    "name": {
                        "type": "XJSIdentifier",
                        "name": "div",
                        "range": [
                            1,
                            4
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 4
                            }
                        }
                    },
                    "selfClosing": true,
                    "attributes": [
                        {
                            "type": "XJSSpreadAttribute",
                            "argument": {
                                "type": "Identifier",
                                "name": "props",
                                "range": [
                                    9,
                                    14
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "range": [
                                5,
                                15
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        18
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 18
                        }
                    }
                },
                closingElement: null,
                "children": [],
                "range": [
                    0,
                    18
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 18
                    }
                }
            },
            "range": [
                0,
                18
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 18
                }
            }
        },

        '<div {...props} post="attribute" />': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "XJSElement",
                "openingElement": {
                    "type": "XJSOpeningElement",
                    "name": {
                        "type": "XJSIdentifier",
                        "name": "div",
                        "range": [
                            1,
                            4
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 4
                            }
                        }
                    },
                    "selfClosing": true,
                    "attributes": [
                        {
                            "type": "XJSSpreadAttribute",
                            "argument": {
                                "type": "Identifier",
                                "name": "props",
                                "range": [
                                    9,
                                    14
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 14
                                    }
                                }
                            },
                            "range": [
                                5,
                                15
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 15
                                }
                            }
                        },
                        {
                            "type": "XJSAttribute",
                            "name": {
                                "type": "XJSIdentifier",
                                "name": "post",
                                "range": [
                                    16,
                                    20
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 16
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 20
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": "attribute",
                                "raw": "\"attribute\"",
                                "range": [
                                    21,
                                    32
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 21
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 32
                                    }
                                }
                            },
                            "range": [
                                16,
                                32
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 16
                                },
                                "end": {
                                    "line": 1,
                                    "column": 32
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        35
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 35
                        }
                    }
                },
                closingElement: null,
                "children": [],
                "range": [
                    0,
                    35
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 35
                    }
                }
            },
            "range": [
                0,
                35
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 35
                }
            }
        },

        '<div pre="leading" pre2="attribute" {...props}></div>': {
            "type": "ExpressionStatement",
            "expression": {
                "type": "XJSElement",
                "openingElement": {
                    "type": "XJSOpeningElement",
                    "name": {
                        "type": "XJSIdentifier",
                        "name": "div",
                        "range": [
                            1,
                            4
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 1
                            },
                            "end": {
                                "line": 1,
                                "column": 4
                            }
                        }
                    },
                    "selfClosing": false,
                    "attributes": [
                        {
                            "type": "XJSAttribute",
                            "name": {
                                "type": "XJSIdentifier",
                                "name": "pre",
                                "range": [
                                    5,
                                    8
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 5
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 8
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": "leading",
                                "raw": "\"leading\"",
                                "range": [
                                    9,
                                    18
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 9
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 18
                                    }
                                }
                            },
                            "range": [
                                5,
                                18
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 5
                                },
                                "end": {
                                    "line": 1,
                                    "column": 18
                                }
                            }
                        },
                        {
                            "type": "XJSAttribute",
                            "name": {
                                "type": "XJSIdentifier",
                                "name": "pre2",
                                "range": [
                                    19,
                                    23
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 19
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 23
                                    }
                                }
                            },
                            "value": {
                                "type": "Literal",
                                "value": "attribute",
                                "raw": "\"attribute\"",
                                "range": [
                                    24,
                                    35
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 24
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 35
                                    }
                                }
                            },
                            "range": [
                                19,
                                35
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 19
                                },
                                "end": {
                                    "line": 1,
                                    "column": 35
                                }
                            }
                        },
                        {
                            "type": "XJSSpreadAttribute",
                            "argument": {
                                "type": "Identifier",
                                "name": "props",
                                "range": [
                                    40,
                                    45
                                ],
                                "loc": {
                                    "start": {
                                        "line": 1,
                                        "column": 40
                                    },
                                    "end": {
                                        "line": 1,
                                        "column": 45
                                    }
                                }
                            },
                            "range": [
                                36,
                                46
                            ],
                            "loc": {
                                "start": {
                                    "line": 1,
                                    "column": 36
                                },
                                "end": {
                                    "line": 1,
                                    "column": 46
                                }
                            }
                        }
                    ],
                    "range": [
                        0,
                        47
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 0
                        },
                        "end": {
                            "line": 1,
                            "column": 47
                        }
                    }
                },
                "closingElement": {
                    "type": "XJSClosingElement",
                    "name": {
                        "type": "XJSIdentifier",
                        "name": "div",
                        "range": [
                            49,
                            52
                        ],
                        "loc": {
                            "start": {
                                "line": 1,
                                "column": 49
                            },
                            "end": {
                                "line": 1,
                                "column": 52
                            }
                        }
                    },
                    "range": [
                        47,
                        53
                    ],
                    "loc": {
                        "start": {
                            "line": 1,
                            "column": 47
                        },
                        "end": {
                            "line": 1,
                            "column": 53
                        }
                    }
                },
                "children": [],
                "range": [
                    0,
                    53
                ],
                "loc": {
                    "start": {
                        "line": 1,
                        "column": 0
                    },
                    "end": {
                        "line": 1,
                        "column": 53
                    }
                }
            },
            "range": [
                0,
                53
            ],
            "loc": {
                "start": {
                    "line": 1,
                    "column": 0
                },
                "end": {
                    "line": 1,
                    "column": 53
                }
            }
        },

        '<a>    </a>': {
            type: 'Program',
            body: [{
                type: 'ExpressionStatement',
                expression: {
                    type: 'XJSElement',
                    openingElement: {
                        type: 'XJSOpeningElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'a',
                            range: [1, 2],
                            loc: {
                                start: {line: 1, column: 1},
                                end: {line: 1, column: 2}
                            }
                        },
                        selfClosing: false,
                        attributes: [],
                        range: [0, 3],
                        loc: {
                            start: {line: 1, column: 0},
                            end: {line: 1, column: 3}
                        }
                    },
                    closingElement: {
                        type: 'XJSClosingElement',
                        name: {
                            type: 'XJSIdentifier',
                            name: 'a',
                            range: [9, 10],
                            loc: {
                                start: {line: 1, column: 9},
                                end: {line: 1, column: 10}
                            }
                        },
                        range: [7, 11],
                        loc: {
                            start: {line: 1, column: 7},
                            end: {line: 1, column: 11}
                        }
                    },
                    children: [
                        {
                            type: 'Literal',
                            value: '    ',
                            raw: '    ',
                            range: [3, 7],
                            loc: {
                                start: {line: 1, column: 3},
                                end: {line: 1, column: 7}
                            }
                        }
                    ],
                    range: [0, 11],
                    loc: {
                        start: {line: 1, column: 0},
                        end: {line: 1, column: 11}
                    }
                },
                range: [0, 11],
                loc: {
                    start: {line: 1, column: 0},
                    end: {line: 1, column: 11}
                }
            }],
            range: [0, 11],
            loc: {
                start: {line: 1, column: 0},
                end: {line: 1, column: 11}
            },
            tokens: [
                {
                    type: 'Punctuator',
                    value: '<',
                    range: [0, 1],
                    loc: {
                        start: {line: 1, column: 0},
                        end: {line: 1, column: 1}
                    }
                },
                {
                    type: 'XJSIdentifier',
                    value: 'a',
                    range: [1, 2],
                    loc: {
                        start: {line: 1, column: 1},
                        end: {line: 1, column: 2}
                    }
                },
                {
                    type: 'Punctuator',
                    value: '>',
                    range: [2, 3],
                    loc: {
                        start: {line: 1, column: 2},
                        end: {line: 1, column: 3}
                    }
                },
                {
                    type: 'XJSText',
                    value: '    ',
                    range: [3, 7],
                    loc: {
                        start: {line: 1, column: 3},
                        end: {line: 1, column: 7}
                    }
                },
                {
                    type: 'Punctuator',
                    value: '<',
                    range: [7, 8],
                    loc: {
                        start: {line: 1, column: 7},
                        end: {line: 1, column: 8}
                    }
                },
                {
                    type: 'Punctuator',
                    value: '/',
                    range: [8, 9],
                    loc: {
                        start: {line: 1, column: 8},
                        end: {line: 1, column: 9}
                    }
                },
                {
                    type: 'XJSIdentifier',
                    value: 'a',
                    range: [9, 10],
                    loc: {
                        start: {line: 1, column: 9},
                        end: {line: 1, column: 10}
                    }
                },
                {
                    type: 'Punctuator',
                    value: '>',
                    range: [10, 11],
                    loc: {
                        start: {line: 1, column: 10},
                        end: {line: 1, column: 11}
                    }
                }
            ]
        }
    },
};



function runTest(expected, result) {
    var actual, options;

    options = {
        indent: '    ',
        directive: true,
        parse: esprima.parse
    };

    actual = escodegen.generate(result, options);
    expect(actual).to.be.equal(expected + ';');
}

describe('JSX support', function () {
    Object.keys(data).forEach(function (category) {
        Object.keys(data[category]).forEach(function (source) {
            it(source, function () {
                runTest(source, data[category][source]);
            });
        });
    });
});
