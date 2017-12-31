(function (root, factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'kotlin', 'three'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('kotlin'), require('three'));
  else {
    if (typeof kotlin === 'undefined') {
      throw new Error("Error loading module 'lsystem-js'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'lsystem-js'.");
    }
    if (typeof THREE === 'undefined') {
      throw new Error("Error loading module 'lsystem-js'. Its dependency 'three' was not found. Please, check whether 'three' is loaded prior to 'lsystem-js'.");
    }
    root['lsystem-js'] = factory(typeof this['lsystem-js'] === 'undefined' ? {} : this['lsystem-js'], kotlin, THREE);
  }
}(this, function (_, Kotlin, $module$three) {
  'use strict';
  var $$importsForInline$$ = _.$$importsForInline$$ || (_.$$importsForInline$$ = {});
  var ensureNotNull = Kotlin.ensureNotNull;
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var take = Kotlin.kotlin.sequences.take_wuwhe2$;
  var last = Kotlin.kotlin.sequences.last_veqyi0$;
  var asIterable = Kotlin.kotlin.text.asIterable_gw00vp$;
  var unboxChar = Kotlin.unboxChar;
  var joinToString = Kotlin.kotlin.collections.joinToString_fmv235$;
  var Unit = Kotlin.kotlin.Unit;
  var CoroutineImpl = Kotlin.kotlin.coroutines.experimental.CoroutineImpl;
  var COROUTINE_SUSPENDED = Kotlin.kotlin.coroutines.experimental.intrinsics.COROUTINE_SUSPENDED;
  var buildSequence = Kotlin.kotlin.coroutines.experimental.buildSequence_of7nec$;
  var THREE$Vector3 = $module$three.Vector3;
  var THREE$Quaternion = $module$three.Quaternion;
  var Pair = Kotlin.kotlin.Pair;
  var math = Kotlin.kotlin.math;
  var kotlin_js_internal_DoubleCompanionObject = Kotlin.kotlin.js.internal.DoubleCompanionObject;
  var toList = Kotlin.kotlin.sequences.toList_veqyi0$;
  var take_0 = Kotlin.kotlin.collections.take_ba2ldo$;
  var equals = Kotlin.equals;
  var last_0 = Kotlin.kotlin.collections.last_2p1efm$;
  var first = Kotlin.kotlin.collections.first_2p1efm$;
  var round = Kotlin.kotlin.math.round_14dthe$;
  var listOf = Kotlin.kotlin.collections.listOf_i5x0yv$;
  var throwUPAE = Kotlin.throwUPAE;
  var THREE$PerspectiveCamera = $module$three.PerspectiveCamera;
  var THREE$Scene = $module$three.Scene;
  var THREE$WebGLRenderer = $module$three.WebGLRenderer;
  var numberToInt = Kotlin.numberToInt;
  var THREE$EffectComposer = $module$three.EffectComposer;
  var THREE$RenderPass = $module$three.RenderPass;
  var THREE$ShaderPass = $module$three.ShaderPass;
  var THREE$BufferGeometry = $module$three.BufferGeometry;
  var THREE$Line = $module$three.Line;
  var THREE$OrbitControls = $module$three.OrbitControls;
  var getCallableRef = Kotlin.getCallableRef;
  var to = Kotlin.kotlin.to_ujzrz7$;
  var mapOf = Kotlin.kotlin.collections.mapOf_qfcya0$;
  var split = Kotlin.kotlin.text.split_ip8yn$;
  var toBoxedChar = Kotlin.toBoxedChar;
  var toDouble = Kotlin.kotlin.text.toDouble_pdl1vz$;
  var toInt = Kotlin.kotlin.text.toInt_pdl1vz$;
  var roundToInt = Kotlin.kotlin.math.roundToInt_yrwdxr$;
  var THREE$Color = $module$three.Color;
  var Triple = Kotlin.kotlin.Triple;
  var THREE$LineBasicMaterial = $module$three.LineBasicMaterial;
  var defineInlineFunction = Kotlin.defineInlineFunction;
  var wrapFunction = Kotlin.wrapFunction;
  var mapOf_0 = Kotlin.kotlin.collections.mapOf_x2b85n$;
  function IndexPage(document) {
    this.body = ensureNotNull(document.body);
    var tmp$, tmp$_0, tmp$_1, tmp$_2, tmp$_3, tmp$_4, tmp$_5;
    this.content = Kotlin.isType(tmp$ = document.getElementById('content'), Node) ? tmp$ : throwCCE();
    this.lSystemEditor = Kotlin.isType(tmp$_0 = document.getElementById('lsystem-editor'), HTMLDivElement) ? tmp$_0 : throwCCE();
    this.name = Kotlin.isType(tmp$_1 = document.getElementById('name'), HTMLSelectElement) ? tmp$_1 : throwCCE();
    this.axiom = Kotlin.isType(tmp$_2 = document.getElementById('axiom'), HTMLInputElement) ? tmp$_2 : throwCCE();
    this.rules = Kotlin.isType(tmp$_3 = document.getElementById('rules'), HTMLTextAreaElement) ? tmp$_3 : throwCCE();
    this.angle = Kotlin.isType(tmp$_4 = document.getElementById('angle'), HTMLInputElement) ? tmp$_4 : throwCCE();
    this.iterations = Kotlin.isType(tmp$_5 = document.getElementById('iterations'), HTMLInputElement) ? tmp$_5 : throwCCE();
  }
  IndexPage.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'IndexPage',
    interfaces: []
  };
  function LSystem(axiom, rules, angle, closedPath, stepLength) {
    if (closedPath === void 0)
      closedPath = false;
    if (stepLength === void 0)
      stepLength = 10.0;
    this.axiom = axiom;
    this.rules = rules;
    this.angle = angle;
    this.closedPath = closedPath;
    this.stepLength = stepLength;
  }
  LSystem.prototype.generatePoints_za3lpa$ = function (iterations) {
    if (iterations === void 0)
      iterations = 3;
    return toPoints(last(take(applySubstitutionRules(this.axiom, this.rules), iterations + 1 | 0)), this.angle, this.stepLength, this.closedPath);
  };
  LSystem.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystem',
    interfaces: []
  };
  function applySubstitutionRules$lambda$lambda(closure$rules) {
    return function (char) {
      var tmp$;
      return (tmp$ = closure$rules.get_11rb$(char)) != null ? tmp$ : String.fromCharCode(unboxChar(char));
    };
  }
  function applySubstitutionRules$lambda(closure$input_0, closure$rules_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$applySubstitutionRules$lambda(closure$input_0, closure$rules_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$applySubstitutionRules$lambda(closure$input_0, closure$rules_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$input = closure$input_0;
    this.local$closure$rules = closure$rules_0;
    this.local$result = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$applySubstitutionRules$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$applySubstitutionRules$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$applySubstitutionRules$lambda.prototype.constructor = Coroutine$applySubstitutionRules$lambda;
  Coroutine$applySubstitutionRules$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.local$result = this.local$closure$input;
            this.state_0 = 2;
            continue;
          case 1:
            throw this.exception_0;
          case 2:
            this.state_0 = 3;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$result, this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 3:
            this.local$result = joinToString(asIterable(this.local$result), '', void 0, void 0, void 0, void 0, applySubstitutionRules$lambda$lambda(this.local$closure$rules));
            this.state_0 = 2;
            continue;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function applySubstitutionRules(axiom, rules, input) {
    if (input === void 0)
      input = axiom;
    return buildSequence(applySubstitutionRules$lambda(input, rules));
  }
  var iterator = Kotlin.kotlin.text.iterator_gw00vp$;
  function toPoints$lambda(closure$startPoint_0, closure$startDirection_0, closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0) {
    return function ($receiver_0, continuation_0, suspended) {
      var instance = new Coroutine$toPoints$lambda(closure$startPoint_0, closure$startDirection_0, closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0, $receiver_0, this, continuation_0);
      if (suspended)
        return instance;
      else
        return instance.doResume(null);
    };
  }
  function Coroutine$toPoints$lambda(closure$startPoint_0, closure$startDirection_0, closure$stepLength_0, closure$angle_0, this$toPoints_0, closure$closedPath_0, $receiver_0, controller, continuation_0) {
    CoroutineImpl.call(this, continuation_0);
    this.$controller = controller;
    this.exceptionState_0 = 1;
    this.local$closure$startPoint = closure$startPoint_0;
    this.local$closure$startDirection = closure$startDirection_0;
    this.local$closure$stepLength = closure$stepLength_0;
    this.local$closure$angle = closure$angle_0;
    this.local$this$toPoints = this$toPoints_0;
    this.local$closure$closedPath = closure$closedPath_0;
    this.local$point = void 0;
    this.local$step = void 0;
    this.local$direction = void 0;
    this.local$stack = void 0;
    this.local$tmp$ = void 0;
    this.local$closure$continuation = void 0;
    this.local$$receiver = $receiver_0;
  }
  Coroutine$toPoints$lambda.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: null,
    interfaces: [CoroutineImpl]
  };
  Coroutine$toPoints$lambda.prototype = Object.create(CoroutineImpl.prototype);
  Coroutine$toPoints$lambda.prototype.constructor = Coroutine$toPoints$lambda;
  Coroutine$toPoints$lambda.prototype.doResume = function () {
    do
      try {
        switch (this.state_0) {
          case 0:
            this.state_0 = 2;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$closure$startPoint.clone(), this);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 1:
            throw this.exception_0;
          case 2:
            this.local$point = {v: this.local$closure$startPoint.clone()};
            this.local$step = this.local$closure$startDirection.clone();
            this.local$step.multiplyScalar(this.local$closure$stepLength);
            this.local$direction = {v: new THREE$Quaternion()};
            this.local$stack = [];
            this.local$tmp$ = iterator(this.local$this$toPoints);
            this.state_0 = 3;
            continue;
          case 3:
            if (!this.local$tmp$.hasNext()) {
              this.state_0 = 17;
              continue;
            }

            var element = unboxChar(this.local$tmp$.next());
            this.local$closure$continuation = this;
            var closure$angle = this.local$closure$angle;
            var tmp$;
            tmp$ = unboxChar(toBoxedChar(element));
            if (tmp$ === 70 || tmp$ === 71 || tmp$ === 72 || tmp$ === 73 || tmp$ === 102 || tmp$ === 103 || tmp$ === 104 || tmp$ === 105) {
              this.local$point.v.add(this.local$step.clone().applyQuaternion(this.local$direction.v));
              this.state_0 = 15;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$point.v.clone(), this.local$closure$continuation);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              if (tmp$ === 43) {
                this.local$direction.v = this.local$direction.v.multiply(rotation(zAxis, closure$angle));
                this.state_0 = 14;
                continue;
              }
               else {
                if (tmp$ === 45) {
                  this.local$direction.v = this.local$direction.v.multiply(rotation(zAxis, -closure$angle));
                  this.state_0 = 13;
                  continue;
                }
                 else {
                  if (tmp$ === 94) {
                    this.local$direction.v = this.local$direction.v.multiply(rotation(yAxis, -closure$angle));
                    this.state_0 = 12;
                    continue;
                  }
                   else {
                    if (tmp$ === 38) {
                      this.local$direction.v = this.local$direction.v.multiply(rotation(yAxis, closure$angle));
                      this.state_0 = 11;
                      continue;
                    }
                     else {
                      if (tmp$ === 60) {
                        this.local$direction.v = this.local$direction.v.multiply(rotation(xAxis, -closure$angle));
                        this.state_0 = 10;
                        continue;
                      }
                       else {
                        if (tmp$ === 62) {
                          this.local$direction.v = this.local$direction.v.multiply(rotation(xAxis, closure$angle));
                          this.state_0 = 9;
                          continue;
                        }
                         else {
                          if (tmp$ === 124) {
                            this.local$direction.v = this.local$direction.v.multiply(rotation(xAxis, 2 * closure$angle));
                            this.state_0 = 8;
                            continue;
                          }
                           else {
                            if (tmp$ === 91) {
                              this.local$stack.push(new Pair(this.local$point.v.clone(), this.local$direction.v.clone()));
                              this.state_0 = 7;
                              continue;
                            }
                             else {
                              if (tmp$ === 93) {
                                var removed = this.local$stack.pop();
                                this.local$point.v = removed.first;
                                this.local$direction.v = removed.second;
                                this.state_0 = 4;
                                this.result_0 = this.local$$receiver.yield_11rb$(dontConnectDots, this.local$closure$continuation);
                                if (this.result_0 === COROUTINE_SUSPENDED)
                                  return COROUTINE_SUSPENDED;
                                break;
                              }
                               else {
                                this.state_0 = 6;
                                continue;
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }

          case 4:
            this.state_0 = 5;
            this.result_0 = this.local$$receiver.yield_11rb$(this.local$point.v.clone(), this.local$closure$continuation);
            if (this.result_0 === COROUTINE_SUSPENDED)
              return COROUTINE_SUSPENDED;
            break;
          case 5:
            this.state_0 = 6;
            continue;
          case 6:
            this.state_0 = 7;
            continue;
          case 7:
            this.state_0 = 8;
            continue;
          case 8:
            this.state_0 = 9;
            continue;
          case 9:
            this.state_0 = 10;
            continue;
          case 10:
            this.state_0 = 11;
            continue;
          case 11:
            this.state_0 = 12;
            continue;
          case 12:
            this.state_0 = 13;
            continue;
          case 13:
            this.state_0 = 14;
            continue;
          case 14:
            this.state_0 = 16;
            continue;
          case 15:
            this.state_0 = 16;
            continue;
          case 16:
            this.state_0 = 3;
            continue;
          case 17:
            if (this.local$closure$closedPath) {
              this.state_0 = 18;
              this.result_0 = this.local$$receiver.yield_11rb$(this.local$closure$startPoint.clone(), this);
              if (this.result_0 === COROUTINE_SUSPENDED)
                return COROUTINE_SUSPENDED;
              break;
            }
             else {
              this.state_0 = 19;
              continue;
            }

          case 18:
            return Unit;
          case 19:
            return Unit;
        }
      }
       catch (e) {
        if (this.state_0 === 1)
          throw e;
        else {
          this.state_0 = this.exceptionState_0;
          this.exception_0 = e;
        }
      }
     while (true);
  };
  function toPoints($receiver, angle, stepLength, closedPath, startPoint, startDirection) {
    if (stepLength === void 0)
      stepLength = 10.0;
    if (closedPath === void 0)
      closedPath = false;
    if (startPoint === void 0)
      startPoint = new THREE$Vector3(0, 0, 0);
    if (startDirection === void 0)
      startDirection = new THREE$Vector3(1, 0, 0);
    return buildSequence(toPoints$lambda(startPoint, startDirection, stepLength, angle, $receiver, closedPath));
  }
  function rotation(axis, angle) {
    var $receiver = new THREE$Quaternion();
    $receiver.setFromAxisAngle(axis, angle);
    return $receiver;
  }
  var xAxis;
  var yAxis;
  var zAxis;
  function toRadians($receiver) {
    return toRadians_0($receiver);
  }
  function toDegrees($receiver) {
    return $receiver / math.PI * 180;
  }
  function toRadians_0($receiver) {
    return $receiver / 180 * math.PI;
  }
  function toXYZString($receiver) {
    return $receiver === dontConnectDots ? 'dcd' : $receiver.x.toString() + ' ' + $receiver.y + ' ' + $receiver.z;
  }
  function toXYZWString($receiver) {
    return $receiver.x.toString() + ' ' + $receiver.y + ' ' + $receiver.z + ' ' + $receiver.w;
  }
  var dontConnectDots;
  function LSystemEditor() {
    this.lSystemPresenters = listOf([new LSystemEditor$LSystemPresenter(kochSnowflake, void 0, 'Koch snowflake', 'https://en.wikipedia.org/wiki/Koch_snowflake'), new LSystemEditor$LSystemPresenter(cesaroFractal, void 0, 'Cesaro fractal', 'http://mathworld.wolfram.com/CesaroFractal.html'), new LSystemEditor$LSystemPresenter(quadraticType2Curve, void 0, 'Quadratic type 2', 'https://en.wikipedia.org/wiki/Koch_snowflake#Variants_of_the_Koch_curve'), new LSystemEditor$LSystemPresenter(hilbertCurve, void 0, 'Hilbert curve', 'https://en.wikipedia.org/wiki/Hilbert_curve'), new LSystemEditor$LSystemPresenter(lindenmayerCurve, void 0, 'Lindenmayer curve'), new LSystemEditor$LSystemPresenter(gosperCurve, void 0, 'Gosper curve', 'https://en.wikipedia.org/wiki/Gosper_curve'), new LSystemEditor$LSystemPresenter(sierpinskiTriangle, void 0, 'Sierpinski triangle', 'https://en.wikipedia.org/wiki/Sierpinski_triangle'), new LSystemEditor$LSystemPresenter(sierpinskiArrowheadCurve, void 0, 'Sierpinski arrow head triangle', 'https://en.wikipedia.org/wiki/Sierpi%C5%84ski_arrowhead_curve'), new LSystemEditor$LSystemPresenter(dragonCurve, 14, 'Dragon curve', 'https://en.wikipedia.org/wiki/Dragon_curve'), new LSystemEditor$LSystemPresenter(fractalPlant, void 0, 'Plant', 'https://en.wikipedia.org/wiki/L-system#Example_7:_Fractal_plant'), new LSystemEditor$LSystemPresenter(hilbertCurve3d, void 0, 'Hilbert Curve 3d', 'https://math.stackexchange.com/questions/123642/representing-a-3d-hilbert-curve-as-an-l-system')]);
    this.presenter = first(this.lSystemPresenters);
    this.debugMode = false;
    this.debugStepSize_0 = 1;
  }
  LSystemEditor.prototype.generatePoints = function () {
    var points = toList(this.presenter.generatePoints());
    return this.debugMode ? take_0(points, this.debugStepSize_0) : points;
  };
  LSystemEditor.prototype.changeLSystem_za3lpa$ = function (direction) {
    var tmp$;
    var $receiver = this.lSystemPresenters;
    var indexOfFirst$result;
    indexOfFirst$break: do {
      var tmp$_0;
      var index = 0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var item = tmp$_0.next();
        if (equals(item.lSystem, this.presenter.lSystem)) {
          indexOfFirst$result = index;
          break indexOfFirst$break;
        }
        index = index + 1 | 0;
      }
      indexOfFirst$result = -1;
    }
     while (false);
    var i = indexOfFirst$result + direction | 0;
    if (i < 0)
      tmp$ = last_0(this.lSystemPresenters);
    else if (i >= this.lSystemPresenters.size)
      tmp$ = first(this.lSystemPresenters);
    else
      tmp$ = this.lSystemPresenters.get_za3lpa$(i);
    this.presenter = tmp$;
    this.debugMode = false;
    this.debugStepSize_0 = 0;
  };
  LSystemEditor.prototype.changeIterationCount_za3lpa$ = function (increment) {
    var tmp$;
    tmp$ = this.presenter;
    tmp$.iterations = tmp$.iterations + increment | 0;
    if (this.presenter.iterations > this.presenter.maxIterations) {
      this.presenter.iterations = this.presenter.maxIterations;
    }
    if (this.presenter.iterations <= 0) {
      this.presenter.iterations = 0;
    }
  };
  LSystemEditor.prototype.increaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 + 1 | 0;
    }
  };
  LSystemEditor.prototype.decreaseDebugStep = function () {
    if (this.debugMode) {
      this.debugStepSize_0 = this.debugStepSize_0 - 1 | 0;
    }
  };
  LSystemEditor.prototype.changeAngle_14dthe$ = function (value) {
    var $receiver = this.presenter.lSystem;
    $receiver.angle = toRadians_0(round(toDegrees($receiver.angle + value)));
    if ($receiver.angle < 0)
      $receiver.angle += 2 * math.PI;
    if ($receiver.angle > 2 * math.PI)
      $receiver.angle -= 2 * math.PI;
  };
  function LSystemEditor$LSystemPresenter(lSystem, maxIterations, name, url) {
    if (maxIterations === void 0)
      maxIterations = 9;
    if (name === void 0)
      name = '';
    if (url === void 0)
      url = null;
    this.lSystem = lSystem;
    this.maxIterations = maxIterations;
    this.name = name;
    this.url = url;
    this.iterations = 1;
  }
  LSystemEditor$LSystemPresenter.prototype.generatePoints = function () {
    return this.lSystem.generatePoints_za3lpa$(this.iterations);
  };
  LSystemEditor$LSystemPresenter.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystemPresenter',
    interfaces: []
  };
  LSystemEditor.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'LSystemEditor',
    interfaces: []
  };
  function WebUI(window_0, page) {
    this.window_0 = window_0;
    this.page_0 = page;
    this.camera_wd379g$_0 = this.camera_wd379g$_0;
    this.scene_2lulix$_0 = this.scene_2lulix$_0;
    this.renderer_otbw2q$_0 = this.renderer_otbw2q$_0;
    this.composer_7cvly7$_0 = this.composer_7cvly7$_0;
    this.stats_2ckilo$_0 = this.stats_2ckilo$_0;
    var $receiver = new WebUI$material1$ObjectLiteral();
    $receiver.color = 0;
    $receiver.opacity = 1.0;
    $receiver.blending = $module$three.AdditiveBlending;
    $receiver.transparent = false;
    this.material1_0 = new THREE$LineBasicMaterial($receiver);
    var $receiver_0 = new WebUI$material2$ObjectLiteral();
    $receiver_0.color = 16777215;
    $receiver_0.opacity = 1.0;
    $receiver_0.blending = $module$three.AdditiveBlending;
    $receiver_0.transparent = false;
    this.material2_0 = new THREE$LineBasicMaterial($receiver_0);
    this.lineMaterial_0 = this.material1_0;
  }
  Object.defineProperty(WebUI.prototype, 'camera_0', {
    get: function () {
      if (this.camera_wd379g$_0 == null)
        return throwUPAE('camera');
      return this.camera_wd379g$_0;
    },
    set: function (camera) {
      this.camera_wd379g$_0 = camera;
    }
  });
  Object.defineProperty(WebUI.prototype, 'scene_0', {
    get: function () {
      if (this.scene_2lulix$_0 == null)
        return throwUPAE('scene');
      return this.scene_2lulix$_0;
    },
    set: function (scene) {
      this.scene_2lulix$_0 = scene;
    }
  });
  Object.defineProperty(WebUI.prototype, 'renderer_0', {
    get: function () {
      if (this.renderer_otbw2q$_0 == null)
        return throwUPAE('renderer');
      return this.renderer_otbw2q$_0;
    },
    set: function (renderer) {
      this.renderer_otbw2q$_0 = renderer;
    }
  });
  Object.defineProperty(WebUI.prototype, 'composer_0', {
    get: function () {
      if (this.composer_7cvly7$_0 == null)
        return throwUPAE('composer');
      return this.composer_7cvly7$_0;
    },
    set: function (composer) {
      this.composer_7cvly7$_0 = composer;
    }
  });
  Object.defineProperty(WebUI.prototype, 'stats_0', {
    get: function () {
      if (this.stats_2ckilo$_0 == null)
        return throwUPAE('stats');
      return this.stats_2ckilo$_0;
    },
    set: function (stats) {
      this.stats_2ckilo$_0 = stats;
    }
  });
  function WebUI$init$lambda$lambda(closure$canvas) {
    return function (f) {
      closure$canvas.focus();
      return Unit;
    };
  }
  var Array_0 = Array;
  function WebUI$init$generateScene(this$WebUI, closure$editor) {
    return function () {
      this$WebUI.clear_0(this$WebUI.scene_0);
      var array = Array_0(0);
      var tmp$;
      tmp$ = array.length - 1 | 0;
      for (var i = 0; i <= tmp$; i++) {
        array[i] = new THREE$Vector3(0, 0, 0);
      }
      var points = {v: array};
      var $receiver = this$WebUI.fitCenteredInto_0(closure$editor.generatePoints(), -100.0, -100.0, -100.0, 100.0, 100.0, 100.0);
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var this$WebUI_0 = this$WebUI;
        if (element === dontConnectDots) {
          var bufferGeometry = new THREE$BufferGeometry();
          bufferGeometry.setFromPoints(points.v);
          this$WebUI_0.scene_0.add(new THREE$Line(bufferGeometry, this$WebUI_0.lineMaterial_0));
          var array_0 = Array_0(0);
          var tmp$_1;
          tmp$_1 = array_0.length - 1 | 0;
          for (var i_0 = 0; i_0 <= tmp$_1; i_0++) {
            array_0[i_0] = new THREE$Vector3(0, 0, 0);
          }
          points.v = array_0;
        }
         else {
          points.v.push(element);
        }
      }
      if (!(points.v.length === 0)) {
        var bufferGeometry_0 = new THREE$BufferGeometry();
        bufferGeometry_0.setFromPoints(points.v);
        this$WebUI.scene_0.add(new THREE$Line(bufferGeometry_0, this$WebUI.lineMaterial_0));
      }
      this$WebUI.render_0();
    };
  }
  function WebUI$init$lambda(this$WebUI) {
    return function (f) {
      this$WebUI.onWindowResize_0();
      return Unit;
    };
  }
  WebUI.prototype.init = function () {
    var tmp$ = this.calcRenderingSizes_0();
    var width = tmp$.component1()
    , height = tmp$.component2()
    , aspect = tmp$.component3();
    this.camera_0 = new THREE$PerspectiveCamera(33.0, aspect, 1.0, 10000.0);
    this.camera_0.position.set(0, 0, 400);
    this.stats_0 = new Stats();
    this.scene_0 = new THREE$Scene();
    var $receiver = new THREE$WebGLRenderer();
    var tmp$_0;
    var canvas = Kotlin.isType(tmp$_0 = this.page_0.content.appendChild($receiver.domElement), HTMLElement) ? tmp$_0 : throwCCE();
    canvas.setAttribute('tabindex', '0');
    canvas.addEventListener('click', WebUI$init$lambda$lambda(canvas));
    $receiver.setPixelRatio(this.window_0.devicePixelRatio);
    $receiver.setSize(numberToInt(width), height);
    this.renderer_0 = $receiver;
    this.applyTheme2_0();
    this.composer_0 = new THREE$EffectComposer(this.renderer_0);
    this.composer_0.addPass(new THREE$RenderPass(this.scene_0, this.camera_0));
    var tmp$_1 = this.composer_0;
    var $receiver_0 = new THREE$ShaderPass($module$three.CopyShader);
    $receiver_0.renderToScreen = true;
    tmp$_1.addPass($receiver_0);
    var editor = new LSystemEditor();
    var generateScene = WebUI$init$generateScene(this, editor);
    generateScene();
    var orbitControls = new THREE$OrbitControls(this.camera_0, this.renderer_0.domElement);
    orbitControls.keyPanSpeed = 0.0;
    this.init_0(editor, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    }));
    this.update_0(editor);
    this.window_0.addEventListener('resize', WebUI$init$lambda(this), false);
    this.window_0.addEventListener('keypress', this.onKeyPress_0(editor, orbitControls, getCallableRef('generateScene', function () {
      return generateScene(), Unit;
    })));
  };
  function WebUI$onKeyPress$lambda(closure$editor) {
    return function () {
      closure$editor.changeLSystem_za3lpa$(1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_0(closure$editor) {
    return function () {
      closure$editor.changeLSystem_za3lpa$(-1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_1(closure$editor) {
    return function () {
      closure$editor.changeIterationCount_za3lpa$(1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_2(closure$editor) {
    return function () {
      closure$editor.changeIterationCount_za3lpa$(-1);
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_3(closure$editor) {
    return function () {
      closure$editor.changeAngle_14dthe$(toRadians(5));
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_4(closure$editor) {
    return function () {
      closure$editor.changeAngle_14dthe$(toRadians(-5));
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_5(closure$orbitControls) {
    return function () {
      closure$orbitControls.reset();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_6(this$WebUI) {
    return function () {
      this$WebUI.applyTheme1_0();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_7(this$WebUI) {
    return function () {
      this$WebUI.applyTheme2_0();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_8(closure$editor) {
    return function () {
      closure$editor.debugMode = !closure$editor.debugMode;
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_9(closure$editor) {
    return function () {
      closure$editor.increaseDebugStep();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_10(closure$editor) {
    return function () {
      closure$editor.decreaseDebugStep();
      return Unit;
    };
  }
  function WebUI$onKeyPress$lambda_11(this$WebUI, closure$editor) {
    return function () {
      var tmp$, tmp$_0;
      return (tmp$_0 = this$WebUI.window_0.open((tmp$ = closure$editor.presenter.url) != null ? tmp$ : '')) != null ? (tmp$_0.focus(), Unit) : null;
    };
  }
  function WebUI$onKeyPress$lambda_12(this$WebUI, closure$mapping, closure$updateUI, closure$editor) {
    return function (event) {
      if (Kotlin.isType(event, KeyboardEvent)) {
        if (equals(event.key, '`')) {
          this$WebUI.toggleLSystemEditor_0();
        }
        if (!Kotlin.isType(event.target, HTMLInputElement)) {
          var action = closure$mapping.get_11rb$(event.key);
          if (action != null) {
            action();
            closure$updateUI();
            this$WebUI.update_0(closure$editor);
          }
        }
      }
      return Unit;
    };
  }
  WebUI.prototype.onKeyPress_0 = function (editor, orbitControls, updateUI) {
    var mapping = mapOf([to('n', WebUI$onKeyPress$lambda(editor)), to('N', WebUI$onKeyPress$lambda_0(editor)), to('i', WebUI$onKeyPress$lambda_1(editor)), to('I', WebUI$onKeyPress$lambda_2(editor)), to('a', WebUI$onKeyPress$lambda_3(editor)), to('A', WebUI$onKeyPress$lambda_4(editor)), to('c', WebUI$onKeyPress$lambda_5(orbitControls)), to('q', WebUI$onKeyPress$lambda_6(this)), to('w', WebUI$onKeyPress$lambda_7(this)), to('d', WebUI$onKeyPress$lambda_8(editor)), to('s', WebUI$onKeyPress$lambda_9(editor)), to('S', WebUI$onKeyPress$lambda_10(editor)), to('u', WebUI$onKeyPress$lambda_11(this, editor))]);
    return WebUI$onKeyPress$lambda_12(this, mapping, updateUI, editor);
  };
  var trim = Kotlin.kotlin.text.trim_gw00vp$;
  var ArrayList_init = Kotlin.kotlin.collections.ArrayList_init_ww73n8$;
  var collectionSizeOrDefault = Kotlin.kotlin.collections.collectionSizeOrDefault_ba2ldo$;
  var mapCapacity = Kotlin.kotlin.collections.mapCapacity_za3lpa$;
  var coerceAtLeast = Kotlin.kotlin.ranges.coerceAtLeast_dqglrj$;
  var LinkedHashMap_init = Kotlin.kotlin.collections.LinkedHashMap_init_xf5xz2$;
  function WebUI$init$applyChanges(this$WebUI, closure$editor, closure$updateUI) {
    return function () {
      closure$editor.presenter.lSystem.axiom = this$WebUI.page_0.axiom.value;
      var tmp$ = closure$editor.presenter.lSystem;
      var $receiver = split(this$WebUI.page_0.rules.value, ['\n']);
      var destination = ArrayList_init();
      var tmp$_0;
      tmp$_0 = $receiver.iterator();
      while (tmp$_0.hasNext()) {
        var element = tmp$_0.next();
        var tmp$_1;
        if (trim(Kotlin.isCharSequence(tmp$_1 = element) ? tmp$_1 : throwCCE()).toString().length > 0)
          destination.add_11rb$(element);
      }
      var destination_0 = ArrayList_init(collectionSizeOrDefault(destination, 10));
      var tmp$_2;
      tmp$_2 = destination.iterator();
      while (tmp$_2.hasNext()) {
        var item = tmp$_2.next();
        destination_0.add_11rb$(split(item, [' => ']));
      }
      var capacity = coerceAtLeast(mapCapacity(collectionSizeOrDefault(destination_0, 10)), 16);
      var destination_1 = LinkedHashMap_init(capacity);
      var tmp$_3;
      tmp$_3 = destination_0.iterator();
      while (tmp$_3.hasNext()) {
        var element_0 = tmp$_3.next();
        var pair = new Pair(toBoxedChar(element_0.get_za3lpa$(0).charCodeAt(0)), element_0.get_za3lpa$(1));
        destination_1.put_xwzc9p$(pair.first, pair.second);
      }
      tmp$.rules = destination_1;
      closure$editor.presenter.lSystem.angle = toRadians_0(toDouble(this$WebUI.page_0.angle.value));
      closure$editor.presenter.iterations = toInt(this$WebUI.page_0.iterations.value);
      closure$updateUI();
    };
  }
  function WebUI$init$lambda$lambda_0(closure$applyChanges) {
    return function (f) {
      closure$applyChanges();
      return Unit;
    };
  }
  function WebUI$init$lambda_0(closure$editor, this$WebUI, closure$updateUI) {
    return function (f) {
      var tmp$ = closure$editor;
      var $receiver = closure$editor.lSystemPresenters;
      var firstOrNull$result;
      firstOrNull$break: do {
        var tmp$_0;
        tmp$_0 = $receiver.iterator();
        while (tmp$_0.hasNext()) {
          var element = tmp$_0.next();
          if (equals(element.name, this$WebUI.page_0.name.value)) {
            firstOrNull$result = element;
            break firstOrNull$break;
          }
        }
        firstOrNull$result = null;
      }
       while (false);
      tmp$.presenter = ensureNotNull(firstOrNull$result);
      this$WebUI.update_0(closure$editor);
      closure$updateUI();
      return Unit;
    };
  }
  WebUI.prototype.init_0 = function (editor, updateUI) {
    var tmp$;
    var applyChanges = WebUI$init$applyChanges(this, editor, updateUI);
    var tmp$_0;
    tmp$_0 = listOf([this.page_0.axiom, this.page_0.rules, this.page_0.angle, this.page_0.iterations]).iterator();
    while (tmp$_0.hasNext()) {
      var element = tmp$_0.next();
      element.addEventListener('input', WebUI$init$lambda$lambda_0(applyChanges));
    }
    this.page_0.name.addEventListener('change', WebUI$init$lambda_0(editor, this, updateUI));
    var child = Kotlin.isType(tmp$ = ensureNotNull(this.page_0.name.firstElementChild).cloneNode(true), HTMLOptionElement) ? tmp$ : throwCCE();
    this.page_0.name.innerHTML = '';
    var tmp$_1, tmp$_0_0;
    var index = 0;
    tmp$_1 = editor.lSystemPresenters.iterator();
    while (tmp$_1.hasNext()) {
      var item = tmp$_1.next();
      var i = (tmp$_0_0 = index, index = tmp$_0_0 + 1 | 0, tmp$_0_0);
      var tmp$_2;
      var $receiver = Kotlin.isType(tmp$_2 = child.cloneNode(true), HTMLOptionElement) ? tmp$_2 : throwCCE();
      $receiver.textContent = item.name;
      $receiver.value = item.name;
      if (i === 0)
        $receiver.setAttribute('selected', 'selected');
      var node = $receiver;
      this.page_0.name.appendChild(node);
    }
  };
  function WebUI$update$lambda(it) {
    var $receiver = unboxChar(it.key);
    return String.fromCharCode($receiver) + ' => ' + it.value;
  }
  WebUI.prototype.update_0 = function (editor) {
    this.page_0.name.value = editor.presenter.name;
    this.page_0.axiom.value = editor.presenter.lSystem.axiom;
    this.page_0.rules.value = joinToString(editor.presenter.lSystem.rules.entries, '\n', void 0, void 0, void 0, void 0, WebUI$update$lambda);
    this.page_0.angle.value = roundToInt(toDegrees(editor.presenter.lSystem.angle)).toString();
    this.page_0.iterations.value = editor.presenter.iterations.toString();
  };
  WebUI.prototype.applyTheme1_0 = function () {
    this.lineMaterial_0 = this.material1_0;
    this.scene_0.background = new THREE$Color(16777215);
    this.page_0.body.style.background = '#ffffff';
  };
  WebUI.prototype.applyTheme2_0 = function () {
    this.lineMaterial_0 = this.material2_0;
    this.scene_0.background = new THREE$Color(0);
    this.page_0.body.style.background = '#000000';
  };
  WebUI.prototype.animate_14dthe$ = function (d) {
    if (d === void 0)
      d = 0.0;
    this.window_0.requestAnimationFrame(getCallableRef('animate', function ($receiver, d) {
      return $receiver.animate_14dthe$(d), Unit;
    }.bind(null, this)));
    this.render_0();
    this.stats_0.update();
  };
  WebUI.prototype.render_0 = function () {
    this.composer_0.render();
  };
  WebUI.prototype.onWindowResize_0 = function () {
    var tmp$ = this.calcRenderingSizes_0();
    var width = tmp$.component1()
    , height = tmp$.component2()
    , aspect = tmp$.component3();
    this.camera_0.aspect = aspect;
    this.camera_0.updateProjectionMatrix();
    this.renderer_0.setSize(numberToInt(width), height);
  };
  WebUI.prototype.calcRenderingSizes_0 = function () {
    var editorWidth = equals(this.page_0.lSystemEditor.style.display, 'none') ? 0.0 : this.page_0.lSystemEditor.getBoundingClientRect().width;
    var width = this.window_0.innerWidth - editorWidth;
    var height = this.window_0.innerHeight;
    var aspect = width / height;
    return new Triple(width, height, aspect);
  };
  WebUI.prototype.toggleLSystemEditor_0 = function () {
    var it = this.page_0.lSystemEditor;
    if (equals(it.style.display, 'none')) {
      it.style.display = '';
    }
     else {
      it.style.display = 'none';
    }
    this.onWindowResize_0();
  };
  WebUI.prototype.clear_0 = function ($receiver) {
    while ($receiver.children.length > 0) {
      var children = $receiver.children;
      $receiver.remove(children[0]);
    }
  };
  var IllegalArgumentException_init = Kotlin.kotlin.IllegalArgumentException;
  var Math_0 = Math;
  WebUI.prototype.fitCenteredInto_0 = function ($receiver, x1, y1, z1, x2, y2, z2) {
    if (!(x1 < x2 && y1 < y2 && z1 < z2)) {
      var message = 'Failed requirement.';
      throw new IllegalArgumentException_init(message.toString());
    }
    var width = x2 - x1;
    var height = y2 - y1;
    var depth = z2 - z1;
    var minBy$result;
    minBy$break: do {
      var iterator = $receiver.iterator();
      if (!iterator.hasNext()) {
        minBy$result = null;
        break minBy$break;
      }
      var minElem = iterator.next();
      var minValue = minElem.x;
      while (iterator.hasNext()) {
        var e = iterator.next();
        var v = e.x;
        if (Kotlin.compareTo(minValue, v) > 0) {
          minElem = e;
          minValue = v;
        }
      }
      minBy$result = minElem;
    }
     while (false);
    var tmp$ = ensureNotNull(minBy$result).x;
    var minBy$result_0;
    minBy$break: do {
      var iterator_0 = $receiver.iterator();
      if (!iterator_0.hasNext()) {
        minBy$result_0 = null;
        break minBy$break;
      }
      var minElem_0 = iterator_0.next();
      var minValue_0 = minElem_0.y;
      while (iterator_0.hasNext()) {
        var e_0 = iterator_0.next();
        var v_0 = e_0.y;
        if (Kotlin.compareTo(minValue_0, v_0) > 0) {
          minElem_0 = e_0;
          minValue_0 = v_0;
        }
      }
      minBy$result_0 = minElem_0;
    }
     while (false);
    var tmp$_0 = ensureNotNull(minBy$result_0).y;
    var minBy$result_1;
    minBy$break: do {
      var iterator_1 = $receiver.iterator();
      if (!iterator_1.hasNext()) {
        minBy$result_1 = null;
        break minBy$break;
      }
      var minElem_1 = iterator_1.next();
      var minValue_1 = minElem_1.z;
      while (iterator_1.hasNext()) {
        var e_1 = iterator_1.next();
        var v_1 = e_1.z;
        if (Kotlin.compareTo(minValue_1, v_1) > 0) {
          minElem_1 = e_1;
          minValue_1 = v_1;
        }
      }
      minBy$result_1 = minElem_1;
    }
     while (false);
    var minPoint = new THREE$Vector3(tmp$, tmp$_0, ensureNotNull(minBy$result_1).z);
    var maxBy$result;
    maxBy$break: do {
      var iterator_2 = $receiver.iterator();
      if (!iterator_2.hasNext()) {
        maxBy$result = null;
        break maxBy$break;
      }
      var maxElem = iterator_2.next();
      var maxValue = maxElem.x;
      while (iterator_2.hasNext()) {
        var e_2 = iterator_2.next();
        var v_2 = e_2.x;
        if (Kotlin.compareTo(maxValue, v_2) < 0) {
          maxElem = e_2;
          maxValue = v_2;
        }
      }
      maxBy$result = maxElem;
    }
     while (false);
    var tmp$_1 = ensureNotNull(maxBy$result).x;
    var maxBy$result_0;
    maxBy$break: do {
      var iterator_3 = $receiver.iterator();
      if (!iterator_3.hasNext()) {
        maxBy$result_0 = null;
        break maxBy$break;
      }
      var maxElem_0 = iterator_3.next();
      var maxValue_0 = maxElem_0.y;
      while (iterator_3.hasNext()) {
        var e_3 = iterator_3.next();
        var v_3 = e_3.y;
        if (Kotlin.compareTo(maxValue_0, v_3) < 0) {
          maxElem_0 = e_3;
          maxValue_0 = v_3;
        }
      }
      maxBy$result_0 = maxElem_0;
    }
     while (false);
    var tmp$_2 = ensureNotNull(maxBy$result_0).y;
    var maxBy$result_1;
    maxBy$break: do {
      var iterator_4 = $receiver.iterator();
      if (!iterator_4.hasNext()) {
        maxBy$result_1 = null;
        break maxBy$break;
      }
      var maxElem_1 = iterator_4.next();
      var maxValue_1 = maxElem_1.z;
      while (iterator_4.hasNext()) {
        var e_4 = iterator_4.next();
        var v_4 = e_4.z;
        if (Kotlin.compareTo(maxValue_1, v_4) < 0) {
          maxElem_1 = e_4;
          maxValue_1 = v_4;
        }
      }
      maxBy$result_1 = maxElem_1;
    }
     while (false);
    var maxPoint = new THREE$Vector3(tmp$_1, tmp$_2, ensureNotNull(maxBy$result_1).z);
    var pointsWidth = maxPoint.x - minPoint.x;
    var pointsHeight = maxPoint.y - minPoint.y;
    var pointsDepth = maxPoint.z - minPoint.z;
    var a = width / pointsWidth;
    var b = height / pointsHeight;
    var a_0 = Math_0.min(a, b);
    var b_0 = depth / pointsDepth;
    var minScale = Math_0.min(a_0, b_0);
    var destination = ArrayList_init(collectionSizeOrDefault($receiver, 10));
    var tmp$_3;
    tmp$_3 = $receiver.iterator();
    while (tmp$_3.hasNext()) {
      var item = tmp$_3.next();
      var tmp$_4 = destination.add_11rb$;
      var transform$result;
      if (item === dontConnectDots) {
        transform$result = item;
      }
       else {
        item.multiplyScalar(minScale);
        item.set(item.x + x1 - minPoint.x * minScale + (width - pointsWidth * minScale) / 2, item.y + y1 - minPoint.y * minScale + (height - pointsHeight * minScale) / 2, item.z + z1 - minPoint.z * minScale + (depth - pointsDepth * minScale) / 2);
        transform$result = item;
      }
      tmp$_4.call(destination, transform$result);
    }
    return destination;
  };
  function WebUI$material1$ObjectLiteral() {
  }
  WebUI$material1$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  function WebUI$material2$ObjectLiteral() {
  }
  WebUI$material2$ObjectLiteral.$metadata$ = {
    kind: Kind_CLASS,
    interfaces: []
  };
  WebUI.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'WebUI',
    interfaces: []
  };
  var push = defineInlineFunction('lsystem-js.lsystem.push_dxn8qf$', function ($receiver, e) {
    return $receiver.push(e);
  });
  var pop = defineInlineFunction('lsystem-js.lsystem.pop_4b5429$', function ($receiver) {
    return $receiver.pop();
  });
  var clear = defineInlineFunction('lsystem-js.lsystem.clear_qjns17$', wrapFunction(function () {
    return function ($receiver) {
      $receiver.length = $receiver.value;
    };
  }));
  var get_length = defineInlineFunction('lsystem-js.lsystem.get_length_qjns17$', function ($receiver) {
    return $receiver.length;
  });
  var applyDynamic = defineInlineFunction('lsystem-js.lsystem.applyDynamic_isrcn9$', function ($receiver, f) {
    f($receiver);
    return $receiver;
  });
  var kochSnowflake;
  var cesaroFractal;
  var quadraticType2Curve;
  var hilbertCurve;
  var lindenmayerCurve;
  var gosperCurve;
  var sierpinskiTriangle;
  var sierpinskiArrowheadCurve;
  var dragonCurve;
  var fractalPlant;
  var hilbertCurve3d;
  var kochCurve3d;
  function main(window_0, document) {
    var $receiver = new WebUI(window_0, new IndexPage(document));
    $receiver.init();
    $receiver.animate_14dthe$();
  }
  var package$lsystem = _.lsystem || (_.lsystem = {});
  package$lsystem.IndexPage = IndexPage;
  package$lsystem.LSystem = LSystem;
  package$lsystem.applySubstitutionRules_5b5ews$ = applySubstitutionRules;
  $$importsForInline$$['lsystem-js'] = _;
  package$lsystem.toPoints_uehay2$ = toPoints;
  package$lsystem.toRadians_s8ev3n$ = toRadians;
  package$lsystem.toDegrees_yrwdxr$ = toDegrees;
  package$lsystem.toRadians_yrwdxr$ = toRadians_0;
  package$lsystem.toXYZString_6oizvm$ = toXYZString;
  package$lsystem.toXYZWString_p9pvvy$ = toXYZWString;
  Object.defineProperty(package$lsystem, 'dontConnectDots', {
    get: function () {
      return dontConnectDots;
    }
  });
  LSystemEditor.LSystemPresenter = LSystemEditor$LSystemPresenter;
  package$lsystem.LSystemEditor = LSystemEditor;
  package$lsystem.WebUI = WebUI;
  package$lsystem.push_dxn8qf$ = push;
  package$lsystem.pop_4b5429$ = pop;
  package$lsystem.applyDynamic_isrcn9$ = applyDynamic;
  package$lsystem.clear_qjns17$ = clear;
  package$lsystem.get_length_qjns17$ = get_length;
  Object.defineProperty(package$lsystem, 'kochSnowflake', {
    get: function () {
      return kochSnowflake;
    }
  });
  Object.defineProperty(package$lsystem, 'cesaroFractal', {
    get: function () {
      return cesaroFractal;
    }
  });
  Object.defineProperty(package$lsystem, 'quadraticType2Curve', {
    get: function () {
      return quadraticType2Curve;
    }
  });
  Object.defineProperty(package$lsystem, 'hilbertCurve', {
    get: function () {
      return hilbertCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'lindenmayerCurve', {
    get: function () {
      return lindenmayerCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'gosperCurve', {
    get: function () {
      return gosperCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'sierpinskiTriangle', {
    get: function () {
      return sierpinskiTriangle;
    }
  });
  Object.defineProperty(package$lsystem, 'sierpinskiArrowheadCurve', {
    get: function () {
      return sierpinskiArrowheadCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'dragonCurve', {
    get: function () {
      return dragonCurve;
    }
  });
  Object.defineProperty(package$lsystem, 'fractalPlant', {
    get: function () {
      return fractalPlant;
    }
  });
  Object.defineProperty(package$lsystem, 'hilbertCurve3d', {
    get: function () {
      return hilbertCurve3d;
    }
  });
  Object.defineProperty(package$lsystem, 'kochCurve3d', {
    get: function () {
      return kochCurve3d;
    }
  });
  package$lsystem.main = main;
  xAxis = new THREE$Vector3(1, 0, 0);
  yAxis = new THREE$Vector3(0, 1, 0);
  zAxis = new THREE$Vector3(0, 0, 1);
  dontConnectDots = new THREE$Vector3(kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN, kotlin_js_internal_DoubleCompanionObject.NaN);
  kochSnowflake = new LSystem('F--F--F', mapOf_0(to(toBoxedChar(70), 'F+F--F+F')), math.PI / 3, true);
  cesaroFractal = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-F+F')), toRadians(85));
  quadraticType2Curve = new LSystem('F', mapOf_0(to(toBoxedChar(70), 'F+F-F-FF+F+F-F')), math.PI / 2);
  hilbertCurve = new LSystem('A', mapOf([to(toBoxedChar(65), '-BF+AFA+FB-'), to(toBoxedChar(66), '+AF-BFB-FA+')]), math.PI / 2);
  lindenmayerCurve = new LSystem('X', mapOf([to(toBoxedChar(88), 'XFYFX+F+YFXFY-F-XFYFX'), to(toBoxedChar(89), 'YFXFY-F-XFYFX+F+YFXFY')]), math.PI / 2);
  gosperCurve = new LSystem('F', mapOf([to(toBoxedChar(70), 'F-G--G+F++FF+G-'), to(toBoxedChar(71), '+F-GG--G-F++F+G')]), toRadians(60));
  sierpinskiTriangle = new LSystem('F-G-G', mapOf([to(toBoxedChar(70), 'F-G+F+G-F'), to(toBoxedChar(71), 'GG')]), toRadians(120));
  sierpinskiArrowheadCurve = new LSystem('F', mapOf([to(toBoxedChar(70), 'G-F-G'), to(toBoxedChar(71), 'F+G+F')]), math.PI / 3);
  dragonCurve = new LSystem('FX', mapOf([to(toBoxedChar(88), 'X+YF+'), to(toBoxedChar(89), '-FX-Y')]), math.PI / 2);
  fractalPlant = new LSystem('+++X', mapOf([to(toBoxedChar(88), 'F[-X][X]F[-X]+FX'), to(toBoxedChar(70), 'FF')]), toRadians(25));
  hilbertCurve3d = new LSystem('X', mapOf_0(to(toBoxedChar(88), '^<XF^<XFX-F^>>XFX&F+>>XFX-F>X->')), math.PI / 2);
  kochCurve3d = new LSystem('A', mapOf([to(toBoxedChar(65), '[[[[F+F-F-F+F]G<+G-G-G+G]H-H+H+H-H]I>+I-I-I+I]'), to(toBoxedChar(70), 'F+F-F-F+F'), to(toBoxedChar(71), 'G<+G-G-G+G'), to(toBoxedChar(72), 'H-H+H+H-H'), to(toBoxedChar(73), 'I>+I-I-I+I')]), math.PI / 2);
  Kotlin.defineModule('lsystem-js', _);
  return _;
}));

//# sourceMappingURL=lsystem-js.js.map
