import type {
 Envelope,
 PipelineResult,
} from "@sakshion/finality";


export interface AdapterResult {

  envelope:
    Envelope;


  pipeline:
    PipelineResult;

}