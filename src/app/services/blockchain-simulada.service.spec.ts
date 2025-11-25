import { TestBed } from '@angular/core/testing';

import { BlockchainSimuladaService } from './blockchain-simulada.service';

describe('BlockchainSimuladaService', () => {
  let service: BlockchainSimuladaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlockchainSimuladaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
